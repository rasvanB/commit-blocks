import { z } from "zod";

const daysArraySchema = z.object({
  avatarUrl: z.string().url(),
  contributionDays: z.array(
    z.object({
      date: z.string().transform((date) => new Date(date)),
      contributionCount: z.number(),
      color: z.string(),
    })
  ),
});

export type Day = z.infer<typeof daysArraySchema>["contributionDays"][number];

export async function fetchContributions(username: string) {
  const NOW = new Date().toISOString();
  const ONE_YEAR_AGO = new Date(
    Date.now() - 1000 * 60 * 60 * 24 * 365
  ).toISOString();

  const data = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `
          {
            user(login: "${username}") {
              avatarUrl(size: 50)
              contributionsCollection(
                from: "${ONE_YEAR_AGO}"
                to: "${NOW}"
              ) {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }
        `,
    }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    next: {
      tags: ["contributions", username],
      revalidate: 60 * 60 * 12,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);

  if (!data.user) return null;

  const days = data.user.contributionsCollection.contributionCalendar.weeks
    .map((week: Record<PropertyKey, any>) => week.contributionDays)
    .flat();

  const result = daysArraySchema.safeParse({
    ...data.user,
    contributionDays: days,
  });

  if (!result.success) return null;
  return result.data;
}

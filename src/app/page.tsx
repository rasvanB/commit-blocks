import { z } from "zod";

const daysArraySchema = z.array(
  z.object({
    date: z.string().transform((date) => new Date(date)),
    contributionCount: z.number(),
    color: z.string(),
  })
);

async function fetchContributions(username: string) {
  const NOW = new Date().toISOString().replace(/\.\d+Z/, "Z");
  const ONE_YEAR_AGO = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)
    .toISOString()
    .replace(/\.\d+Z/, "Z");

  const data = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `
          {
            user(login: "${username}") {
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
  })
    .then((res) => res.json())
    .then((res) => res.data);

  const days = data.user.contributionsCollection.contributionCalendar.weeks
    .map((w: Record<PropertyKey, any>) => w.contributionDays)
    .flat();

  const result = daysArraySchema.safeParse(days);

  if (!result.success) return [];
  return result.data;
}

export default async function Home() {
  const days = await fetchContributions("rasvanB");

  return <main></main>;
}

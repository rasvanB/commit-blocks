import ThreeCanvas from "@/components/canvas";
import Controls from "@/components/controls";
import DayInfo from "@/components/day-info";
import Error from "@/components/error";
import SearchUser from "@/components/search-user";
import UserInfo from "@/components/user-info";
import { fetchContributions } from "@/utils/fetch";

export default async function Home({
  searchParams,
}: {
  searchParams: { username: string | undefined };
}) {
  if (!searchParams.username)
    return (
      <div className="flex flex-col items-center gap-5">
        <div className="text-center flex flex-col items-center gap-3">
          <h2 className="text-3xl font-semibold">
            Your GitHub Journey, Visualized in 3D Blocks
          </h2>
          <p className="max-w-md text-muted-foreground text-justify">
            {
              "See your commits transformed into 3D blocks, a simple yet captivating way to appreciate your progress and hard work."
            }
          </p>
        </div>
        <SearchUser />
      </div>
    );

  const data = await fetchContributions(searchParams.username);

  if (!data)
    return (
      <Error
        error={{
          title: "User not found",
          message: "Please check the username and try again.",
        }}
      />
    );

  return (
    <>
      <UserInfo username={searchParams.username} avatarUrl={data.avatarUrl} />
      <Controls />
      <ThreeCanvas contributionDays={data.contributionDays} />
      <DayInfo />
    </>
  );
}

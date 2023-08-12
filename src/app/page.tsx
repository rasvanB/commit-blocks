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
      <>
        <SearchUser />
      </>
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

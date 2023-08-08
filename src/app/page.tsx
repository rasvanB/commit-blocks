import ThreeCanvas from "@/components/canvas";
import DayInfo from "@/components/day-info";
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

  if (!data) return <div className="text-white">User not found</div>;

  return (
    <>
      <UserInfo username={searchParams.username} avatarUrl={data.avatarUrl} />
      <ThreeCanvas contributionDays={data.contributionDays} />
      <DayInfo />
    </>
  );
}

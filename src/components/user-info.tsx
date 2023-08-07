import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserInfo = ({
  username,
  avatarUrl,
}: {
  username: string;
  avatarUrl: string;
}) => {
  return (
    <div className="flex gap-2 items-center justify-center absolute top-3 w-full z-[100]">
      <Link
        href={`https://github.com/${username}`}
        className="bg-neutral-900 hover:bg-neutral-800 hover:cursor-pointer hover:outline-neutral-700 px-3 py-2 outline outline-1 outline-neutral-800 rounded-lg flex items-center justify-center gap-3 select-none"
      >
        <Avatar className="w-[30px] h-[30px] rounded-md">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <div className="text-white leading-none">{username}</div>
      </Link>
    </div>
  );
};

export default UserInfo;

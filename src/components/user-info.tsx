import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const UserInfo = ({
  username,
  avatarUrl,
}: {
  username: string;
  avatarUrl: string;
}) => {
  return (
    <div className="flex gap-2 items-center justify-center absolute top-3 w-full z-[100]">
      <Button variant="outline" className="bg-card" size="sm" asChild>
        <Link
          href="/"
          className="outline-neutral-800 rounded-lg absolute top-0 left-4 select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 512 512"
            className="sm:mr-2 mr-0"
          >
            <path
              fill="currentColor"
              d="m464 440l-28.12-32.11c-22.48-25.65-43.33-45.45-72.08-58.7c-26.61-12.26-60-18.65-104.27-19.84V432L48 252L259.53 72v103.21c72.88 3 127.18 27.08 161.56 71.75C449.56 284 464 335.19 464 399.26Z"
            ></path>
          </svg>
          <div className="text-white leading-none sm:block hidden">Back</div>
        </Link>
      </Button>

      <Button variant="outline" className="bg-card py-5 px-3" asChild>
        <Link
          href={`https://github.com/${username}`}
          className="outline-neutral-800 rounded-lg flex items-center justify-center gap-3 select-none"
        >
          <Avatar className="w-[30px] h-[30px] rounded-md">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>av</AvatarFallback>
          </Avatar>
          <div className="text-white leading-none">{username}</div>
        </Link>
      </Button>
    </div>
  );
};

export default UserInfo;

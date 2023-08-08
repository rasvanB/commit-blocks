"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useRouter } from "next/navigation";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  return (
    <form
      className="w-[300px] flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`?username=${username}`);
      }}
    >
      <Label className="text-white">Enter your Github username</Label>
      <Input
        placeholder="username..."
        minLength={1}
        maxLength={39}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant={"default"} type="submit">
        Search
      </Button>
    </form>
  );
};

export default SearchUser;

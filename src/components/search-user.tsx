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
    <div className="w-[300px] flex flex-col gap-3">
      <Label className="text-white">Username</Label>
      <Input
        placeholder="username..."
        className="text-muted-foreground"
        minLength={1}
        maxLength={39}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        variant={"default"}
        onClick={() => router.push(`?username=${username}`)}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchUser;

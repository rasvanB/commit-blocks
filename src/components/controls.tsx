"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const Controls = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[175px] space-y-2 absolute top-3 right-3 z-[100] rounded-md"
    >
      <div className="w-fit flex items-center justify-end space-x-4 px-2 py-0.5 bg-card rounded-md outline outline-1 outline-accent">
        <h4 className="text-sm font-semibold">Controls</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 15l5 5l5-5M7 9l5-5l5 5"
              ></path>
            </svg>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm bg-card">
          Left click + drag to rotate
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm bg-card">
          Scroll to zoom
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Controls;

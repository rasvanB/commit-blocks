"use client";
import { hoveredDayAtom } from "@/utils/atoms";
import { useAtom } from "jotai";

const DayInfo = () => {
  const [day] = useAtom(hoveredDayAtom);
  if (!day) return null;
  return (
    <div className="absolute bottom-2 bg-card outline outline-1 outline-accent py-2 px-4 rounded-md flex flex-col items-center justify-center tabular-nums">
      <div className="text-white">Date: {day.date.toLocaleDateString()}</div>
      <div className="text-white">
        Number of contributions: {day.contributionCount}
      </div>
    </div>
  );
};

export default DayInfo;

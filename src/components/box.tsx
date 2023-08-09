"use client";

import { newShade } from "@/lib/utils";
import { hoveredDayAtom } from "@/utils/atoms";
import { type Day } from "@/utils/fetch";
import { type MeshProps } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useState } from "react";

const Box = ({
  size,
  day,
  ...other
}: {
  size: [number, number, number];
  day: Day;
} & MeshProps) => {
  const [hovered, setHover] = useState(false);
  const [, setHoveredDay] = useAtom(hoveredDayAtom);
  return (
    <mesh
      {...other}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHover(true);
        setHoveredDay(day);
      }}
      onPointerLeave={(e) => {
        setHover(false);
      }}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={hovered ? newShade(day.color, 50) : day.color}
      />
    </mesh>
  );
};

export default Box;

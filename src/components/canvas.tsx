"use client";
import { newShade } from "@/lib/utils";
import { Day } from "@/utils/fetch";
import { useAtom } from "jotai";
import {
  FirstPersonControls,
  FlyControls,
  MapControls,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { Canvas, MeshProps } from "@react-three/fiber";
import { useState } from "react";
import { hoveredDayAtom } from "@/utils/atoms";

const MAX_HEIGHT = 5;

function Box({
  size,
  day,
  ...other
}: {
  size: [number, number, number];
  day: Day;
} & MeshProps) {
  const [hovered, setHover] = useState(false);
  const [, setHoveredDay] = useAtom(hoveredDayAtom);
  return (
    <mesh
      {...other}
      scale={1}
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
}

const ContributionMap = ({ contributionDays }: { contributionDays: Day[] }) => {
  const maxContributions = Math.max(
    ...contributionDays.map((day) => day.contributionCount)
  );
  const ROWS = 7;
  const COLS = 365 / ROWS;

  return (
    <mesh position={[-ROWS / 2, 0, -COLS / 2]}>
      {contributionDays.map((day, i) => {
        const height = (day.contributionCount / maxContributions) * MAX_HEIGHT;
        return (
          <Box
            day={day}
            key={i}
            size={[1, height, 1]}
            position={[i % ROWS, height / 2 + 2.01, Math.floor(i / ROWS)]}
          />
        );
      })}
      <mesh position={[ROWS / 2 - 0.5, 1, COLS / 2]}>
        <boxGeometry args={[ROWS + 2, 2, COLS + 2]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
    </mesh>
  );
};

const ThreeCanvas = ({ contributionDays }: { contributionDays: Day[] }) => {
  const hasContributions = contributionDays.some(
    (day) => day.contributionCount > 0
  );
  if (!hasContributions)
    return (
      <div className="text-white text-center">
        No contributions in the last year!
      </div>
    );
  return (
    <div className="w-full h-full bg-backgroundImage bg-no-repeat bg-cover backdrop-blur-3xl">
      <Canvas camera={{ position: [45, 40, 0] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <ContributionMap contributionDays={contributionDays} />
        <OrbitControls
          enableDamping
          maxDistance={50}
          minDistance={15}
          enablePan={false}
          mouseButtons={{
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2,
          }}
        />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;

"use client";
import { Day } from "@/utils/fetch";
import { OrbitControls } from "@react-three/drei";
import { Canvas, MeshProps } from "@react-three/fiber";
import { useState } from "react";

const MAX_HEIGHT = 5;

function Box(
  props: MeshProps & {
    color: string;
    size: [number, number, number];
  }
) {
  const [hovered, setHover] = useState(false);
  return (
    <mesh
      {...props}
      scale={1}
      onPointerOver={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <boxGeometry args={props.size} />
      <meshStandardMaterial color={props.color} />
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
            color={day.color}
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
    <div className="w-full h-full">
      <Canvas camera={{ position: [45, 40, 0] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <ContributionMap contributionDays={contributionDays} />
        <OrbitControls maxDistance={30} minDistance={15} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;

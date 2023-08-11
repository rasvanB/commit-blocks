"use client";

import { type Day } from "@/utils/fetch";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ContributionMap from "./contribution-map";
import Error from "./error";

const ThreeCanvas = ({ contributionDays }: { contributionDays: Day[] }) => {
  const hasContributions = contributionDays.some(
    (day) => day.contributionCount > 0
  );
  if (!hasContributions)
    return (
      <Error
        error={{
          title: "No contributions in the last year.",
        }}
      />
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
        />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;

import { Day } from "@/utils/fetch";
import Box from "./box";

const MAX_HEIGHT = 5;
const ROWS = 7;
const COLS = 365 / ROWS;
const BASE_HEIGHT = 2;

const ContributionMap = ({ contributionDays }: { contributionDays: Day[] }) => {
  const maxContributions = Math.max(
    ...contributionDays.map((day) => day.contributionCount)
  );

  return (
    <mesh position={[-ROWS / 2, 0, -COLS / 2]}>
      {contributionDays.map((day, i) => {
        const HEIGHT = (day.contributionCount / maxContributions) * MAX_HEIGHT;
        return (
          <Box
            day={day}
            key={i}
            size={[1, HEIGHT, 1]}
            // 0.01 is to avoid z-fighting
            position={[
              i % ROWS,
              HEIGHT / 2 + BASE_HEIGHT + 0.01,
              Math.floor(i / ROWS),
            ]}
          />
        );
      })}
      <mesh position={[ROWS / 2 - 0.5, 1, COLS / 2]}>
        <boxGeometry args={[ROWS + 2, BASE_HEIGHT, COLS + 2]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
    </mesh>
  );
};

export default ContributionMap;

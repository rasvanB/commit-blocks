import { Day } from "@/utils/fetch";
import Box from "./box";

const MAX_HEIGHT = 5;

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

export default ContributionMap;

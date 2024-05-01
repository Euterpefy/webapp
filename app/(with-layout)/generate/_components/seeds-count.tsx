import { MAXSEEDS } from "@/config/spotify-api";
import React from "react";
import { Progress } from "@/components/ui/progress";

interface Props {
  curSeeds: number;
}

const SeedsProgressBar: React.FC<Props> = ({ curSeeds }) => {
  return (
    <div className="w-full">
      <p className="w-fit uppercase text-sm font-bold text-info">
        Selected seeds {curSeeds}/{MAXSEEDS}
      </p>
      <Progress value={(curSeeds / MAXSEEDS) * 100} />
    </div>
  );
};

export default SeedsProgressBar;

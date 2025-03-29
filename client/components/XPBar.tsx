
import { useXP } from "@/contexts/XPContext";
import { Star } from "lucide-react";

const XPBar = () => {
  const { xp, level, progress } = useXP();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-8 h-8 bg-finance-purple rounded-full">
            <Star className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">Level {level}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {xp} XP • {progress}% to next level
        </div>
      </div>
      <div className="xp-progress-container">
        <div
          className="xp-progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default XPBar;

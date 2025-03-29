
import { useXP } from "@/contexts/XPContext";
import { CheckCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LessonCardProps {
  id: string;
  courseId: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  locked: boolean;
  duration: string;
}

const LessonCard = ({
  id,
  courseId,
  title,
  description,
  xpReward,
  completed,
  locked,
  duration,
}: LessonCardProps) => {
  const navigate = useNavigate();
  const { addXP } = useXP();

  const handleStartLesson = () => {
    if (locked) return;
    navigate(`/course/${courseId}/lesson/${id}`);
  };

  const handleCompleteDemo = () => {
    if (completed) return;
    addXP(xpReward);
    // In a real app, we'd update the lesson status in the database
  };

  return (
    <div className="border rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center">
          {completed ? (
            <CheckCircle className="w-6 h-6 text-finance-green" />
          ) : locked ? (
            <Lock className="w-6 h-6 text-muted-foreground" />
          ) : (
            <div className="bg-finance-purple text-white text-sm font-semibold rounded-full px-3 py-1">
              +{xpReward} XP
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{duration}</div>
        <div className="flex gap-2">
          {!completed && !locked && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleCompleteDemo}
              className="text-finance-purple hover:text-finance-purple/80 hover:bg-finance-purple/10"
            >
              Complete Demo
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleStartLesson}
            disabled={locked}
            variant={locked ? "outline" : "default"}
            className={locked ? "" : "bg-finance-purple hover:bg-finance-purple/90"}
          >
            {completed ? "Review" : locked ? "Locked" : "Start"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;

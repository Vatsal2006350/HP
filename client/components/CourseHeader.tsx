
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CourseHeaderProps {
  title: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  gradient: string;
}

const CourseHeader = ({
  title,
  description,
  progress,
  icon,
  gradient,
}: CourseHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={cn("p-8 rounded-xl text-white", gradient)}>
      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:text-white hover:bg-white/20 mb-4"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to courses
      </Button>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-white/80 max-w-2xl">{description}</p>
        </div>
        <div className="course-card-icon">{icon}</div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">Course progress</div>
          <div className="text-sm font-semibold">{progress}%</div>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white/80"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;

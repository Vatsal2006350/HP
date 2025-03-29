
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  lessons: number;
  completed: number;
  gradient: string;
}

const CourseCard = ({
  id,
  title,
  description,
  icon: Icon,
  lessons,
  completed,
  gradient,
}: CourseCardProps) => {
  const navigate = useNavigate();
  const completion = Math.round((completed / lessons) * 100);

  return (
    <div
      className={cn("course-card cursor-pointer", gradient)}
      onClick={() => navigate(`/course/${id}`)}
    >
      <div className="p-6 text-white">
        <div className="course-card-icon">
          <Icon size={24} />
        </div>
        <h3 className="mt-4 text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-white/80">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">
            {completed}/{lessons} lessons completed
          </div>
          <div className="text-sm font-semibold">{completion}%</div>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white/80"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

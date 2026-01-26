import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/mockData";

interface CourseCardProps {
  course: Course;
  isInstructor?: boolean;
}

const gradientClasses = {
  indigo: "gradient-indigo",
  emerald: "gradient-emerald",
  orange: "gradient-orange",
  blue: "gradient-blue",
};

export function CourseCard({ course, isInstructor = false }: CourseCardProps) {
  const basePath = isInstructor ? "/instructor" : "/student";

  return (
    <div className="group overflow-hidden rounded-xl border bg-card shadow-card card-hover">
      <div className={cn("h-32 w-full", gradientClasses[course.coverGradient])} />
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1">{course.title}</h3>
          <p className="text-sm text-muted-foreground">{course.instructor}</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-primary">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Last accessed: {course.lastAccessed}</span>
        </div>

        <Link to={`${basePath}/course/${course.id}`} className="block">
          <Button className="w-full btn-transition" size="sm">
            {isInstructor ? "Manage" : "Continue"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Chapter } from "@/data/mockData";

interface ChapterItemProps {
  chapter: Chapter;
  chapterNumber: number;
  courseId: string;
}

export function ChapterItem({ chapter, chapterNumber, courseId }: ChapterItemProps) {
  const getStatusIcon = () => {
    if (chapter.completed) {
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    }
    if (chapter.inProgress) {
      return <Clock className="h-5 w-5 text-warning" />;
    }
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  const getStatusText = () => {
    if (chapter.completed) return "Completed";
    if (chapter.inProgress) return "In Progress";
    return "Not Started";
  };

  return (
    <Link
      to={`/student/course/${courseId}/chapter/${chapter.id}`}
      className={cn(
        "flex items-center gap-4 rounded-lg border bg-card p-4 transition-all duration-200",
        "hover:border-primary/30 hover:shadow-sm",
        chapter.completed && "bg-success/5 border-success/20"
      )}
    >
      <div className="flex-shrink-0">
        {getStatusIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Chapter {chapterNumber}
          </span>
          {chapter.quizScore !== undefined && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Quiz: {chapter.quizScore}%
            </span>
          )}
        </div>
        <h4 className="font-medium text-foreground truncate">{chapter.title}</h4>
      </div>

      <div className="flex-shrink-0 text-right">
        <span className={cn(
          "text-sm",
          chapter.completed ? "text-success" : chapter.inProgress ? "text-warning" : "text-muted-foreground"
        )}>
          {getStatusText()}
        </span>
      </div>
    </Link>
  );
}

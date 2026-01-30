import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Clock, Target, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { instructorCourses, courseStudents, courseChapters } from "@/data/mockData";

export default function StudentProgress() {
  const { id: courseId, studentId } = useParams<{ id: string; studentId: string }>();

  const course = instructorCourses.find((c) => c.id === courseId);
  const student = courseStudents.find((s) => s.id === studentId);
  const chapters = courseChapters[courseId || "1"] || [];

  if (!course || !student) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Student or course not found</p>
      </div>
    );
  }

  // Generate mock chapter progress for this student
  const chapterProgress = chapters.map((chapter, index) => ({
    ...chapter,
    studentCompleted: index < Math.floor(chapters.length * (student.progress / 100)),
    studentScore: chapter.quizScore ? Math.max(0, chapter.quizScore + Math.floor(Math.random() * 20) - 10) : undefined,
    timeSpent: `${Math.floor(Math.random() * 45) + 15} min`,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <main className="container px-4 py-6 md:px-6 md:py-8 max-w-3xl">
        {/* Back Button */}
        <Link
          to="/instructor"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="space-y-6">
          {/* Student Header */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p className="text-muted-foreground">{student.email}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Progress</span>
                </div>
                <p className="text-2xl font-bold text-primary">{student.progress}%</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">Avg Score</span>
                </div>
                <p className={cn(
                  "text-2xl font-bold",
                  student.avgScore >= 80 ? "text-success" :
                  student.avgScore >= 60 ? "text-warning" : "text-destructive"
                )}>
                  {student.avgScore}%
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Last Active</span>
                </div>
                <p className="text-lg font-semibold">{student.lastActive}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">Chapters</span>
                </div>
                <p className="text-lg font-semibold">
                  {chapterProgress.filter(c => c.studentCompleted).length}/{chapters.length}
                </p>
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="text-lg font-semibold mb-4">{course.title}</h2>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{student.progress}%</span>
              </div>
              <Progress value={student.progress} className="h-2.5" />
            </div>

            <h3 className="font-medium text-sm text-muted-foreground mb-3">Chapter Breakdown</h3>
            <div className="space-y-3">
              {chapterProgress.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className={cn(
                    "rounded-lg border p-4",
                    chapter.studentCompleted ? "bg-success/5 border-success/20" : "bg-background"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center text-sm font-semibold",
                        chapter.studentCompleted ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      )}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{chapter.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {chapter.studentCompleted ? "Completed" : "Not completed"}
                          {chapter.timeSpent && ` - ${chapter.timeSpent}`}
                        </p>
                      </div>
                    </div>
                    {chapter.studentScore !== undefined && (
                      <div className="text-right">
                        <p className={cn(
                          "text-lg font-bold",
                          chapter.studentScore >= 80 ? "text-success" :
                          chapter.studentScore >= 60 ? "text-warning" : "text-destructive"
                        )}>
                          {chapter.studentScore}%
                        </p>
                        <p className="text-xs text-muted-foreground">Quiz Score</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

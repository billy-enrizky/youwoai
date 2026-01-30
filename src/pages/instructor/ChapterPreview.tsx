import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, Sparkles, Edit } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { instructorCourses, courseChapters } from "@/data/mockData";

export default function ChapterPreview() {
  const { id: courseId, chapterId } = useParams<{ id: string; chapterId: string }>();

  const course = instructorCourses.find((c) => c.id === courseId);
  const chapters = courseChapters[courseId || "1"] || [];
  const chapter = chapters.find((c) => c.id === chapterId);

  if (!course || !chapter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Chapter not found</p>
      </div>
    );
  }

  const chapterNumber = chapters.findIndex((c) => c.id === chapterId) + 1;

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <main className="container px-4 py-6 md:px-6 md:py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          to={`/instructor/course/${courseId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {course.title}
        </Link>

        <div className="space-y-6">
          {/* Chapter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Chapter {chapterNumber}</p>
              <h1 className="text-2xl font-bold">{chapter.title}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Content
              </Button>
              <Link to={`/instructor/course/${courseId}/chapter/${chapterId}/generate-quiz`}>
                <Button className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Quiz
                </Button>
              </Link>
            </div>
          </div>

          {/* Content Preview */}
          <div className="rounded-xl border bg-card shadow-card overflow-hidden">
            <div className="aspect-[4/3] md:aspect-[16/9] bg-muted/30 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{chapter.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This is where the chapter content (PDF, notes, or interactive materials) would be displayed.
                </p>
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                  <FileText className="h-3.5 w-3.5" />
                  PDF Document - 24 pages
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Status */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-semibold mb-4">Quiz Status</h2>
            {chapter.quizScore !== undefined ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
                  <div>
                    <p className="font-medium">Quiz Published</p>
                    <p className="text-sm text-muted-foreground">5 questions - Multiple Choice, True/False</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">{chapter.quizScore}%</p>
                    <p className="text-sm text-muted-foreground">Class Average</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Edit Quiz</Button>
                  <Link to={`/instructor/course/${courseId}/chapter/${chapterId}/generate-quiz`} className="flex-1">
                    <Button variant="outline" className="w-full gap-2">
                      <Sparkles className="h-4 w-4" />
                      Regenerate
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No Quiz Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate a quiz from this chapter's content using AI.
                </p>
                <Link to={`/instructor/course/${courseId}/chapter/${chapterId}/generate-quiz`}>
                  <Button className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate Quiz
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

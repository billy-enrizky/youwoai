import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Brain, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { ChapterItem } from "@/components/course/ChapterItem";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { studentCourses, courseChapters } from "@/data/mockData";
import { cn } from "@/lib/utils";

const gradientClasses = {
  indigo: "gradient-indigo",
  emerald: "gradient-emerald",
  orange: "gradient-orange",
  blue: "gradient-blue",
};

export default function StudentCourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("chapters");

  const course = studentCourses.find((c) => c.id === id);
  const chapters = courseChapters[id || "1"] || [];

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Course not found</p>
      </div>
    );
  }

  const completedChapters = chapters.filter((c) => c.completed).length;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header showSearch={false} />

      <main className="container px-4 py-6 md:px-6 md:py-8">
        {/* Back Button */}
        <Link
          to="/student"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        {/* Course Header */}
        <div className="rounded-xl overflow-hidden border bg-card shadow-card mb-6">
          <div className={cn("h-32 md:h-40", gradientClasses[course.coverGradient])} />
          <div className="p-5 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-muted-foreground mt-1">{course.instructor}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {completedChapters} of {chapters.length} chapters completed
                </span>
                <span className="font-semibold text-primary">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2.5" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="chapters" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Chapters</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Quizzes</span>
            </TabsTrigger>
            <TabsTrigger value="tutor" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">AI Tutor</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chapters" className="space-y-3">
            {chapters.map((chapter, index) => (
              <ChapterItem
                key={chapter.id}
                chapter={chapter}
                chapterNumber={index + 1}
                courseId={course.id}
              />
            ))}
          </TabsContent>

          <TabsContent value="quizzes">
            <div className="rounded-xl border bg-card p-8 text-center">
              <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Your Quiz Results</h3>
              <p className="text-sm text-muted-foreground mb-4">
                View all your quiz attempts and scores across chapters.
              </p>
              <div className="space-y-3 max-w-md mx-auto">
                {chapters.filter(c => c.quizScore !== undefined).map((chapter, index) => (
                  <div key={chapter.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm font-medium">Chapter {index + 1}: {chapter.title}</span>
                    <span className={cn(
                      "font-semibold",
                      (chapter.quizScore || 0) >= 80 ? "text-success" : "text-warning"
                    )}>
                      {chapter.quizScore}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tutor">
            <div className="rounded-xl border bg-card p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">AI Tutor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get help with any topic from this course. The AI tutor has access to all course materials.
              </p>
              <Button>
                Start Conversation
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <MobileNav />
    </div>
  );
}

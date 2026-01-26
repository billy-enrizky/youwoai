import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, FileText, MessageSquare, Layers } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { AIChatPanel } from "@/components/chat/AIChatPanel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { studentCourses, courseChapters } from "@/data/mockData";

export default function ChapterContent() {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const [activeTab, setActiveTab] = useState("chat");

  const course = studentCourses.find((c) => c.id === courseId);
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

  const handleMarkComplete = () => {
    toast({
      title: "Chapter completed!",
      description: "Great job! You can now take the quiz to test your knowledge.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20 md:pb-0">
      <Header showSearch={false} />

      {/* Chapter Header */}
      <div className="border-b bg-card">
        <div className="container px-4 py-4 md:px-6">
          <Link
            to={`/student/course/${courseId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {course.title}
          </Link>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">
            Chapter {chapterNumber}: {chapter.title}
          </h1>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          {/* Simulated Document Viewer */}
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

          {/* Action Buttons */}
          <div className="border-t p-4 flex flex-wrap gap-3">
            <Button onClick={handleMarkComplete} className="gap-2" disabled={chapter.completed}>
              <CheckCircle className="h-4 w-4" />
              {chapter.completed ? "Completed" : "Mark as Complete"}
            </Button>
            <Link to={`/student/course/${courseId}/chapter/${chapterId}/quiz`}>
              <Button variant="outline" className="gap-2">
                <Layers className="h-4 w-4" />
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 h-11">
              <TabsTrigger value="chat" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Chat
              </TabsTrigger>
              <TabsTrigger value="quiz" className="gap-2">
                <Layers className="h-4 w-4" />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="gap-2">
                <FileText className="h-4 w-4" />
                Flashcards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-4">
              <div className="rounded-xl border overflow-hidden">
                <AIChatPanel chapterTitle={chapter.title} />
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="mt-4">
              <div className="rounded-xl border bg-card p-8 text-center">
                <Layers className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Chapter Quiz</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Test your understanding of {chapter.title}
                </p>
                {chapter.quizScore !== undefined ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">{chapter.quizScore}%</p>
                    <p className="text-sm text-muted-foreground">Your best score</p>
                    <Button variant="outline" className="mt-2">Retake Quiz</Button>
                  </div>
                ) : (
                  <Button>Start Quiz</Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="flashcards" className="mt-4">
              <div className="rounded-xl border bg-card p-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Review key concepts with AI-generated flashcards
                </p>
                <Button>Generate Flashcards</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Users, Settings, Sparkles, Eye } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { instructorCourses, courseChapters, courseStudents } from "@/data/mockData";

const gradientClasses = {
  indigo: "gradient-indigo",
  emerald: "gradient-emerald",
  orange: "gradient-orange",
  blue: "gradient-blue",
};

export default function InstructorCourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("chapters");

  const course = instructorCourses.find((c) => c.id === id);
  const chapters = courseChapters[id || "1"] || [];

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <main className="container px-4 py-6 md:px-6 md:py-8">
        {/* Back Button */}
        <Link
          to="/instructor"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Course Header */}
        <div className="rounded-xl overflow-hidden border bg-card shadow-card mb-6">
          <div className={cn("h-32 md:h-40", gradientClasses[course.coverGradient])} />
          <div className="p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                  {course.title}
                </h1>
                <p className="text-muted-foreground mt-1">{course.instructor}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/instructor/course/${id}/settings`}>
                  <Button variant="outline" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">Students</p>
                <p className="text-xl font-bold">{course.totalStudents || 45}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">Chapters</p>
                <p className="text-xl font-bold">{chapters.length}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-xl font-bold">{course.progress}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="chapters" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Chapters</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chapters" className="space-y-3">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="flex items-center gap-4 rounded-lg border bg-card p-4"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{chapter.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {chapter.quizScore !== undefined ? `Quiz available - Avg: ${chapter.quizScore}%` : "No quiz yet"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/instructor/course/${id}/chapter/${chapter.id}/preview`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  </Link>
                  <Link to={`/instructor/course/${id}/chapter/${chapter.id}/generate-quiz`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Generate Quiz
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="students" className="space-y-3">
            {courseStudents.slice(0, 5).map((student) => (
              <Link
                key={student.id}
                to={`/instructor/course/${id}/student/${student.id}`}
                className="flex items-center gap-4 rounded-lg border bg-card p-4 hover:border-primary/30 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">{student.name}</h4>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <Progress value={student.progress} className="h-2" />
                  </div>
                  <span className={cn(
                    "font-medium w-12 text-right",
                    student.avgScore >= 80 ? "text-success" :
                    student.avgScore >= 60 ? "text-warning" : "text-destructive"
                  )}>
                    {student.avgScore}%
                  </span>
                </div>
              </Link>
            ))}
            <Link to="/instructor" className="block">
              <Button variant="outline" className="w-full">
                View All Students
              </Button>
            </Link>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

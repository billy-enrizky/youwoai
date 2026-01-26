import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { CourseCard } from "@/components/course/CourseCard";
import { JoinCourseModal } from "@/components/course/JoinCourseModal";
import { Button } from "@/components/ui/button";
import { studentCourses } from "@/data/mockData";

export default function StudentDashboard() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container px-4 py-6 md:px-6 md:py-8">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Welcome back, Sam!
              </h1>
              <p className="text-muted-foreground mt-1">
                Continue where you left off or join a new course.
              </p>
            </div>
            <Button onClick={() => setJoinModalOpen(true)} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Join Course
            </Button>
          </div>

          {/* My Courses Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4">My Courses</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <MobileNav />
      <JoinCourseModal open={joinModalOpen} onOpenChange={setJoinModalOpen} />
    </div>
  );
}

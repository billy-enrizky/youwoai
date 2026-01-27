import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Target, AlertTriangle, Download, Bell, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/instructor/StatCard";
import { StudentTable } from "@/components/instructor/StudentTable";
import { CourseCard } from "@/components/course/CourseCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { instructorCourses, courseStudents, courseStats } from "@/data/mockData";

export default function InstructorDashboard() {
  const [selectedCourse, setSelectedCourse] = useState(instructorCourses[0].id);
  const [activeTab, setActiveTab] = useState("students");

  const currentCourse = instructorCourses.find((c) => c.id === selectedCourse);

  const handleExportCSV = () => {
    // Generate CSV content from student data
    const headers = ["Name", "Email", "Progress (%)", "Average Score (%)", "Last Active", "At Risk"];
    const csvRows = [
      headers.join(","),
      ...courseStudents.map(student => [
        `"${student.name}"`,
        student.email,
        student.progress,
        student.avgScore,
        `"${student.lastActive}"`,
        student.atRisk ? "Yes" : "No"
      ].join(","))
    ];
    const csvContent = csvRows.join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${currentCourse?.title || "course"}-students-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export complete!",
      description: "Student progress data has been downloaded as CSV.",
    });
  };

  const handleSendReminder = () => {
    toast({
      title: "Reminders sent!",
      description: "5 at-risk students have been notified.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-6 md:px-6 md:py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Instructor Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor student progress and manage your courses.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/instructor/create-course">
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Course
                </Button>
              </Link>
            </div>
          </div>

          {/* Course Selector */}
          <div className="flex items-center gap-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {instructorCourses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Students"
              value={courseStats.totalStudents}
              icon={Users}
              variant="default"
            />
            <StatCard
              title="Average Progress"
              value={courseStats.averageProgress}
              icon={TrendingUp}
              variant="success"
              trend="+5% from last week"
            />
            <StatCard
              title="Average Score"
              value={courseStats.averageScore}
              icon={Target}
              variant="default"
            />
            <StatCard
              title="At-Risk Students"
              value={courseStats.atRiskStudents}
              icon={AlertTriangle}
              variant="warning"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="h-11">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
              </TabsList>

              {activeTab === "students" && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExportCSV}>
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSendReminder}>
                    <Bell className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </div>
              )}
            </div>

            <TabsContent value="students" className="mt-6">
              <StudentTable students={courseStudents} courseId={selectedCourse} />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="rounded-xl border bg-card p-8 text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Course Analytics</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Detailed analytics including completion rates, quiz performance trends, and student engagement metrics will be displayed here.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {instructorCourses.map((course) => (
                  <CourseCard key={course.id} course={course} isInstructor />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

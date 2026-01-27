import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import ChapterContent from "./pages/student/ChapterContent";
import TakeQuiz from "./pages/student/TakeQuiz";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import CourseSettings from "./pages/instructor/CourseSettings";
import GenerateQuiz from "./pages/instructor/GenerateQuiz";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/course/:id" element={<StudentCourseDetail />} />
          <Route path="/student/course/:courseId/chapter/:chapterId" element={<ChapterContent />} />
          <Route path="/student/course/:courseId/chapter/:chapterId/quiz" element={<TakeQuiz />} />
          
          {/* Instructor Routes */}
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/instructor/create-course" element={<CreateCourse />} />
          <Route path="/instructor/course/:id" element={<CourseSettings />} />
          <Route path="/instructor/course/:id/settings" element={<CourseSettings />} />
          <Route path="/instructor/course/:id/chapter/:chapterId/generate-quiz" element={<GenerateQuiz />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

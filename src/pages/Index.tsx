import { Link } from "react-router-dom";
import { GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-indigo">
              <span className="text-sm font-bold text-primary-foreground">Y</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">YouWoAI</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              AI-Native Course Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Transform your learning experience with intelligent course creation, 
              adaptive quizzes, and AI-powered tutoring.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <GraduationCap className="h-5 w-5" />
                I'm a Student
              </Button>
            </Link>
            <Link to="/instructor">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                <Users className="h-5 w-5" />
                I'm an Instructor
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            CSC301 Course Project · University of Toronto · Partner: YouWoAI
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>Prototype for Course System MVP</p>
        </div>
      </footer>
    </div>
  );
}

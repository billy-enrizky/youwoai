import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, RefreshCw, Users, Clock, Shield, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { instructorCourses, courseStudents } from "@/data/mockData";

export default function CourseSettings() {
  const { id } = useParams<{ id: string }>();
  const course = instructorCourses.find((c) => c.id === id);

  const [inviteCode, setInviteCode] = useState(course?.inviteCode || "CSC301-XK7P");
  const [expiration, setExpiration] = useState("never");
  const [usageLimit, setUsageLimit] = useState("unlimited");
  const [requireApproval, setRequireApproval] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Course not found</p>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast({
      title: "Copied!",
      description: "Invite code copied to clipboard.",
    });
  };

  const handleRegenerateCode = () => {
    const newCode = `${course.title.split(" ")[0].toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setInviteCode(newCode);
    toast({
      title: "Code regenerated",
      description: "A new invite code has been generated.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "The enrollment link has been copied to your clipboard.",
    });
  };

  const handleRemoveStudent = (studentName: string) => {
    toast({
      title: "Student removed",
      description: `${studentName} has been removed from the course.`,
    });
  };

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
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground mt-1">Course Settings & Enrollment</p>
          </div>

          {/* Invite Code Section */}
          <div className="rounded-xl border bg-card p-6 shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Enrollment</h2>
              <p className="text-sm text-muted-foreground">
                Share this invite code with students to enroll them in your course.
              </p>
            </div>

            {/* Large Code Display */}
            <div
              onClick={handleCopyCode}
              className="rounded-xl bg-muted/50 p-6 text-center cursor-pointer hover:bg-muted transition-colors group"
            >
              <p className="text-3xl md:text-4xl font-mono font-bold tracking-widest text-primary">
                {inviteCode}
              </p>
              <p className="text-sm text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                Click to copy
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleCopyCode} className="gap-2">
                <Copy className="h-4 w-4" />
                Copy Code
              </Button>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Link
              </Button>
              <Button variant="outline" onClick={handleRegenerateCode} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
            </div>

            {/* Code Settings */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-medium">Code Settings</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Expiration
                  </label>
                  <Select value={expiration} onValueChange={setExpiration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never expires</SelectItem>
                      <SelectItem value="1day">1 day</SelectItem>
                      <SelectItem value="7days">7 days</SelectItem>
                      <SelectItem value="30days">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Usage Limit
                  </label>
                  <Select value={usageLimit} onValueChange={setUsageLimit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                      <SelectItem value="10">10 uses</SelectItem>
                      <SelectItem value="25">25 uses</SelectItem>
                      <SelectItem value="50">50 uses</SelectItem>
                      <SelectItem value="100">100 uses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Require Approval</p>
                    <p className="text-sm text-muted-foreground">
                      Students must be approved before enrolling
                    </p>
                  </div>
                </div>
                <Switch
                  checked={requireApproval}
                  onCheckedChange={setRequireApproval}
                />
              </div>
            </div>
          </div>

          {/* Enrolled Students */}
          <div className="rounded-xl border bg-card p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Enrolled Students</h2>
              <span className="text-sm text-muted-foreground">
                {courseStudents.length} students
              </span>
            </div>

            <div className="space-y-2">
              {courseStudents.slice(0, 5).map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveStudent(student.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface JoinCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinCourseModal({ open, onOpenChange }: JoinCourseModalProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Please enter an invite code");
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (code.toUpperCase() === "CSC301-XK7P") {
      toast({
        title: "Successfully joined!",
        description: "You have been enrolled in CSC301 - Software Engineering",
      });
      onOpenChange(false);
      setCode("");
    } else {
      setError("Invalid invite code. Please check and try again.");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join a Course</DialogTitle>
          <DialogDescription>
            Enter the invite code provided by your instructor to join a course.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter invite code (e.g., CSC301-XK7P)"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              className={`text-center text-lg font-mono tracking-wider ${error ? "border-destructive" : ""}`}
              disabled={loading}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Join Course
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

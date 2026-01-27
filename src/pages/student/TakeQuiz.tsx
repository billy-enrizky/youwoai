import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { studentCourses, courseChapters } from "@/data/mockData";

interface QuizQuestion {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false";
  options: string[];
  correctAnswer: string;
}

const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: "1",
    text: "What is the primary purpose of version control systems like Git?",
    type: "multiple-choice",
    options: [
      "To compile code faster",
      "To track changes and collaborate on code",
      "To deploy applications to production",
      "To write unit tests automatically"
    ],
    correctAnswer: "To track changes and collaborate on code"
  },
  {
    id: "2",
    text: "A commit in Git represents a snapshot of your entire repository at a specific point in time.",
    type: "true-false",
    options: ["True", "False"],
    correctAnswer: "True"
  },
  {
    id: "3",
    text: "Which Git command is used to create a new branch?",
    type: "multiple-choice",
    options: [
      "git new branch",
      "git branch <name>",
      "git create branch",
      "git make branch"
    ],
    correctAnswer: "git branch <name>"
  },
  {
    id: "4",
    text: "What does 'git pull' do?",
    type: "multiple-choice",
    options: [
      "Pushes local changes to remote",
      "Fetches and merges changes from remote",
      "Creates a new repository",
      "Deletes a branch"
    ],
    correctAnswer: "Fetches and merges changes from remote"
  },
  {
    id: "5",
    text: "Merge conflicts can only be resolved by deleting the conflicting files.",
    type: "true-false",
    options: ["True", "False"],
    correctAnswer: "False"
  }
];

export default function TakeQuiz() {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const navigate = useNavigate();

  const course = studentCourses.find((c) => c.id === courseId);
  const chapters = courseChapters[courseId || "1"] || [];
  const chapter = chapters.find((c) => c.id === chapterId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  if (!course || !chapter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Quiz not found</p>
      </div>
    );
  }

  const chapterNumber = chapters.findIndex((c) => c.id === chapterId) + 1;
  const questions = sampleQuizQuestions;
  const totalQuestions = questions.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[currentQuestion].id]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    toast({
      title: "Quiz submitted!",
      description: "Your answers have been recorded.",
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setQuizStarted(false);
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQ.id];
  const score = calculateScore();

  // Start screen
  if (!quizStarted && !showResults) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Header showSearch={false} />

        <main className="container px-4 py-6 md:px-6 md:py-8 max-w-2xl">
          <Link
            to={`/student/course/${courseId}/chapter/${chapterId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Chapter
          </Link>

          <div className="rounded-xl border bg-card p-8 text-center shadow-card">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Chapter {chapterNumber} Quiz</h1>
            <p className="text-muted-foreground mb-6">{chapter.title}</p>

            <div className="space-y-4 text-left max-w-sm mx-auto mb-8">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Questions</span>
                <span className="font-semibold">{totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Question Types</span>
                <span className="font-semibold">Multiple Choice, True/False</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Time Limit</span>
                <span className="font-semibold">No limit</span>
              </div>
            </div>

            <Button size="lg" onClick={() => setQuizStarted(true)} className="w-full max-w-sm">
              Start Quiz
            </Button>
          </div>
        </main>

        <MobileNav />
      </div>
    );
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Header showSearch={false} />

        <main className="container px-4 py-6 md:px-6 md:py-8 max-w-2xl">
          <div className="rounded-xl border bg-card p-8 text-center shadow-card">
            <div className={cn(
              "h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6",
              score >= 80 ? "bg-success/10" : score >= 60 ? "bg-warning/10" : "bg-destructive/10"
            )}>
              <Trophy className={cn(
                "h-10 w-10",
                score >= 80 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive"
              )} />
            </div>

            <h1 className="text-2xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground mb-6">{chapter.title}</p>

            <div className={cn(
              "text-5xl font-bold mb-2",
              score >= 80 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive"
            )}>
              {score}%
            </div>
            <p className="text-muted-foreground mb-8">
              You got {questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length} out of {totalQuestions} questions correct
            </p>

            {/* Question Review */}
            <div className="space-y-3 text-left mb-8">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Review Answers</h3>
              {questions.map((q, index) => {
                const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      isCorrect ? "bg-success/10" : "bg-destructive/10"
                    )}
                  >
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Q{index + 1}: {q.text}</p>
                      {!isCorrect && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Correct: {q.correctAnswer}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleRetake} className="flex-1">
                Retake Quiz
              </Button>
              <Link to={`/student/course/${courseId}`} className="flex-1">
                <Button className="w-full">
                  Back to Course
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <MobileNav />
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header showSearch={false} />

      <main className="container px-4 py-6 md:px-6 md:py-8 max-w-2xl">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="rounded-xl border bg-card p-6 shadow-card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              currentQ.type === "multiple-choice" 
                ? "bg-primary/10 text-primary" 
                : "bg-success/10 text-success"
            )}>
              {currentQ.type === "multiple-choice" ? "Multiple Choice" : "True/False"}
            </span>
          </div>

          <h2 className="text-lg font-semibold mb-6">{currentQ.text}</h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all",
                  selectedAnswer === option
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                    selectedAnswer === option
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  )}>
                    {selectedAnswer === option && (
                      <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1"
          >
            Previous
          </Button>
          {currentQuestion === totalQuestions - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < totalQuestions}
              className="flex-1"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="flex-1"
            >
              Next
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <div className="mt-6 p-4 rounded-xl border bg-card">
          <p className="text-sm text-muted-foreground mb-3">Question Navigator</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={cn(
                  "h-8 w-8 rounded-lg text-sm font-medium transition-colors",
                  currentQuestion === index
                    ? "bg-primary text-primary-foreground"
                    : selectedAnswers[q.id]
                    ? "bg-success/20 text-success"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

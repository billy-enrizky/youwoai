import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Trash2, Edit3, RefreshCw, FileText, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { instructorCourses, courseChapters } from "@/data/mockData";

interface GeneratedQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  source: string;
  options?: string[];
  answer?: string;
}

const sampleQuestions: GeneratedQuestion[] = [
  {
    id: "1",
    text: "What is the primary purpose of unit testing in software development?",
    type: "multiple-choice",
    source: "Page 42, Section 4.1",
    options: [
      "To test the entire application at once",
      "To test individual components in isolation",
      "To test user interface elements",
      "To test database connections"
    ],
    answer: "To test individual components in isolation"
  },
  {
    id: "2",
    text: "Mocking allows developers to simulate real objects in tests.",
    type: "true-false",
    source: "Page 45, Section 4.2",
    answer: "True"
  },
  {
    id: "3",
    text: "Explain the difference between unit tests and integration tests.",
    type: "short-answer",
    source: "Page 48, Section 4.3"
  },
  {
    id: "4",
    text: "Which testing approach involves testing components in combination?",
    type: "multiple-choice",
    source: "Page 50, Section 4.4",
    options: [
      "Unit testing",
      "Integration testing",
      "Acceptance testing",
      "Smoke testing"
    ],
    answer: "Integration testing"
  },
  {
    id: "5",
    text: "Test-Driven Development (TDD) requires writing tests before code.",
    type: "true-false",
    source: "Page 55, Section 4.6",
    answer: "True"
  }
];

export default function GenerateQuiz() {
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  const navigate = useNavigate();

  const course = instructorCourses.find((c) => c.id === id);
  const chapters = courseChapters[id || "1"] || [];
  const chapter = chapters.find((c) => c.id === chapterId);

  const [numQuestions, setNumQuestions] = useState("5");
  const [questionTypes, setQuestionTypes] = useState({
    multipleChoice: true,
    trueFalse: true,
    shortAnswer: false,
  });
  const [difficulty, setDifficulty] = useState("mixed");
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  if (!course || !chapter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Chapter not found</p>
      </div>
    );
  }

  const chapterNumber = chapters.findIndex((c) => c.id === chapterId) + 1;

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setQuestions(sampleQuestions);
    setIsGenerating(false);
    
    toast({
      title: "Quiz generated!",
      description: `${sampleQuestions.length} questions have been generated.`,
    });
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGenerating(false);
    
    toast({
      title: "Quiz regenerated",
      description: "New questions have been generated.",
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
    toast({
      title: "Question removed",
      description: "The question has been removed from the quiz.",
    });
  };

  const handleSaveQuiz = () => {
    toast({
      title: "Quiz saved!",
      description: "The quiz has been saved and is ready for students.",
    });
    navigate(`/instructor/course/${id}`);
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return 'bg-primary/10 text-primary';
      case 'true-false':
        return 'bg-success/10 text-success';
      case 'short-answer':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <main className="container px-4 py-6 md:px-6 md:py-8 max-w-3xl">
        {/* Back Button */}
        <Link
          to={`/instructor/course/${id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Generate Quiz</h1>
            <p className="text-muted-foreground mt-1">
              Chapter {chapterNumber}: {chapter.title}
            </p>
          </div>

          {/* Settings Card */}
          <div className="rounded-xl border bg-card p-6 shadow-card space-y-6">
            <h2 className="font-semibold">Quiz Settings</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Questions</label>
                <Select value={numQuestions} onValueChange={setNumQuestions}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 questions</SelectItem>
                    <SelectItem value="10">10 questions</SelectItem>
                    <SelectItem value="15">15 questions</SelectItem>
                    <SelectItem value="20">20 questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Question Types</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={questionTypes.multipleChoice}
                    onCheckedChange={(checked) =>
                      setQuestionTypes({ ...questionTypes, multipleChoice: !!checked })
                    }
                  />
                  <span className="text-sm">Multiple Choice</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={questionTypes.trueFalse}
                    onCheckedChange={(checked) =>
                      setQuestionTypes({ ...questionTypes, trueFalse: !!checked })
                    }
                  />
                  <span className="text-sm">True/False</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={questionTypes.shortAnswer}
                    onCheckedChange={(checked) =>
                      setQuestionTypes({ ...questionTypes, shortAnswer: !!checked })
                    }
                  />
                  <span className="text-sm">Short Answer</span>
                </label>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full gap-2"
              size="lg"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Quiz"}
            </Button>
          </div>

          {/* Generated Questions */}
          {questions.length > 0 && (
            <div className="rounded-xl border bg-card p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Generated Questions</h2>
                <Button variant="outline" size="sm" onClick={handleRegenerate} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </Button>
              </div>

              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="rounded-lg border bg-background p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-muted-foreground">
                            Q{index + 1}
                          </span>
                          <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            getTypeBadgeColor(question.type)
                          )}>
                            {question.type.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="font-medium">{question.text}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Source: {question.source}</span>
                    </div>

                    {question.options && (
                      <div className="space-y-1.5 mt-3">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={cn(
                              "flex items-center gap-2 text-sm p-2 rounded-md",
                              option === question.answer
                                ? "bg-success/10 text-success"
                                : "bg-muted/50"
                            )}
                          >
                            {option === question.answer && (
                              <CheckCircle className="h-4 w-4 flex-shrink-0" />
                            )}
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  Edit All
                </Button>
                <Button onClick={handleSaveQuiz} className="flex-1">
                  Save Quiz
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

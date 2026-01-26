import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Upload, FolderOpen, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ChapterDraft {
  id: string;
  title: string;
  sourceNote: string;
}

const initialChapters: ChapterDraft[] = [
  { id: "1", title: "Introduction to Software Engineering", sourceNote: "intro.pdf" },
  { id: "2", title: "Agile Development Methodology", sourceNote: "agile.pdf" },
  { id: "3", title: "Version Control with Git", sourceNote: "git-basics.pdf" },
  { id: "4", title: "Software Testing Strategies", sourceNote: "testing.pdf" },
  { id: "5", title: "Design Patterns Overview", sourceNote: "patterns.pdf" },
];

const steps = [
  { id: 1, title: "Select Source" },
  { id: 2, title: "Course Details" },
  { id: 3, title: "Organize Chapters" },
  { id: 4, title: "Review & Publish" },
];

export default function CreateCourse() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [chapters, setChapters] = useState<ChapterDraft[]>(initialChapters);

  const progressPercent = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/instructor");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setChapters(items);
  };

  const handlePublish = () => {
    toast({
      title: "Course published!",
      description: "Your course is now live and ready for students.",
    });
    navigate("/instructor");
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your course has been saved as a draft.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <main className="container px-4 py-6 md:px-6 md:py-8 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          <Progress value={progressPercent} className="h-2 mb-4" />

          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center gap-2",
                  step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step.id < currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id === currentStep
                      ? "bg-primary/10 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span className="text-xs hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="rounded-xl border bg-card p-6 md:p-8 shadow-card">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Select Source Folder</h2>
                <p className="text-muted-foreground">
                  Choose a folder from your notes to create a course from.
                </p>
              </div>

              <div
                onClick={() => setSelectedFolder("CSC301 Notes")}
                className={cn(
                  "rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all",
                  selectedFolder
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                {selectedFolder ? (
                  <>
                    <p className="font-semibold text-primary">{selectedFolder}</p>
                    <p className="text-sm text-muted-foreground mt-1">5 notes selected</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">Click to select a folder</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Or drag and drop your notes here
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Course Details</h2>
                <p className="text-muted-foreground">
                  Provide information about your course.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Course Title *
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., CSC301 - Software Engineering"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn in this course..."
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cover Image</label>
                  <div className="rounded-xl border-2 border-dashed p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Organize Chapters</h2>
                <p className="text-muted-foreground">
                  Drag and drop to reorder chapters.
                </p>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="chapters">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {chapters.map((chapter, index) => (
                        <Draggable
                          key={chapter.id}
                          draggableId={chapter.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={cn(
                                "flex items-center gap-3 rounded-lg border bg-background p-4 transition-shadow",
                                snapshot.isDragging && "shadow-lg"
                              )}
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="text-muted-foreground hover:text-foreground cursor-grab"
                              >
                                <GripVertical className="h-5 w-5" />
                              </div>
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">
                                  {index + 1}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{chapter.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {chapter.sourceNote}
                                </p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Button variant="outline" className="w-full">
                Add Chapter
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Review & Publish</h2>
                <p className="text-muted-foreground">
                  Review your course before publishing.
                </p>
              </div>

              <div className="rounded-xl border bg-muted/30 p-5 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Course Title</p>
                  <p className="font-semibold">{courseTitle || "CSC301 - Software Engineering"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>{courseDescription || "No description provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chapters</p>
                  <p className="font-semibold">{chapters.length} chapters</p>
                </div>
              </div>

              <div className="space-y-3">
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
                  >
                    <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm">{chapter.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {currentStep < steps.length ? (
            <Button onClick={handleNext} className="flex-1 gap-2">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleSaveDraft} className="flex-1">
                Save as Draft
              </Button>
              <Button onClick={handlePublish} className="flex-1">
                Publish Course
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

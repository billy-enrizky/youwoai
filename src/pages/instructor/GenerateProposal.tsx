import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Sparkles, 
  GripVertical, 
  Pencil, 
  Trash2, 
  Plus,
  Eye,
  Code,
  RefreshCw,
  Check,
  Clock,
  BookOpen
} from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ProposalChapter {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  estimatedMinutes: number;
  sourcePages: number[];
}

interface CourseProposal {
  title: string;
  description: string;
  chapters: ProposalChapter[];
  metadata: {
    generatedAt: string;
    sourceDocuments: string[];
  };
}

const sampleProposal: CourseProposal = {
  title: "Introduction to Software Engineering",
  description: "A comprehensive course covering fundamental software engineering principles, methodologies, and best practices for building scalable applications.",
  chapters: [
    {
      id: "1",
      title: "Introduction to Software Engineering",
      summary: "Overview of software engineering principles, history, and importance in modern development.",
      topics: ["Software lifecycle", "Engineering principles", "Industry overview"],
      estimatedMinutes: 45,
      sourcePages: [1, 15]
    },
    {
      id: "2",
      title: "Agile Development Methodology",
      summary: "Understanding agile principles, Scrum framework, and iterative development practices.",
      topics: ["Agile manifesto", "Scrum", "Sprint planning", "User stories"],
      estimatedMinutes: 60,
      sourcePages: [16, 35]
    },
    {
      id: "3",
      title: "Version Control with Git",
      summary: "Mastering Git for collaborative development, branching strategies, and code management.",
      topics: ["Git basics", "Branching", "Merging", "Pull requests"],
      estimatedMinutes: 50,
      sourcePages: [36, 52]
    },
    {
      id: "4",
      title: "Software Testing Strategies",
      summary: "Comprehensive testing approaches including unit, integration, and end-to-end testing.",
      topics: ["Unit testing", "Integration testing", "TDD", "Test coverage"],
      estimatedMinutes: 55,
      sourcePages: [53, 70]
    },
    {
      id: "5",
      title: "Design Patterns Overview",
      summary: "Common design patterns and their applications in software architecture.",
      topics: ["Creational patterns", "Structural patterns", "Behavioral patterns"],
      estimatedMinutes: 65,
      sourcePages: [71, 95]
    }
  ],
  metadata: {
    generatedAt: new Date().toISOString(),
    sourceDocuments: ["software-engineering-textbook.pdf", "agile-guide.pdf"]
  }
};

export default function GenerateProposal() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"upload" | "generating" | "edit">("upload");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [proposal, setProposal] = useState<CourseProposal | null>(null);
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"visual" | "json">("visual");
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadedFiles(["software-engineering-textbook.pdf", "agile-guide.pdf"]);
    toast({
      title: "Files uploaded",
      description: "2 PDF files ready for processing.",
    });
  };

  const handleGenerate = () => {
    setStep("generating");
    
    // Simulate AI generation with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setGenerationProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setProposal(sampleProposal);
        setStep("edit");
        toast({
          title: "Proposal generated!",
          description: "AI has created a course proposal from your documents.",
        });
      }
    }, 300);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !proposal) return;

    const items = Array.from(proposal.chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProposal({ ...proposal, chapters: items });
  };

  const handleChapterEdit = (chapterId: string, field: keyof ProposalChapter, value: string | string[] | number) => {
    if (!proposal) return;
    
    setProposal({
      ...proposal,
      chapters: proposal.chapters.map(ch => 
        ch.id === chapterId ? { ...ch, [field]: value } : ch
      )
    });
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (!proposal) return;
    
    setProposal({
      ...proposal,
      chapters: proposal.chapters.filter(ch => ch.id !== chapterId)
    });
    
    toast({
      title: "Chapter removed",
      description: "The chapter has been removed from the proposal.",
    });
  };

  const handleAddChapter = () => {
    if (!proposal) return;
    
    const newChapter: ProposalChapter = {
      id: String(Date.now()),
      title: "New Chapter",
      summary: "Enter chapter summary...",
      topics: ["Topic 1"],
      estimatedMinutes: 30,
      sourcePages: []
    };
    
    setProposal({
      ...proposal,
      chapters: [...proposal.chapters, newChapter]
    });
    setEditingChapter(newChapter.id);
  };

  const handleRegenerate = () => {
    setStep("generating");
    setGenerationProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      setGenerationProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setProposal({
          ...sampleProposal,
          title: "Software Engineering Fundamentals",
          chapters: sampleProposal.chapters.map((ch, i) => ({
            ...ch,
            id: String(Date.now() + i)
          }))
        });
        setStep("edit");
        toast({
          title: "Proposal regenerated!",
          description: "A new course proposal has been generated.",
        });
      }
    }, 200);
  };

  const handleAccept = () => {
    toast({
      title: "Course created!",
      description: "Your course has been created from the proposal.",
    });
    navigate("/instructor");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <main className="container px-4 py-6 md:px-6 md:py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/instructor/create-course")}
          className="gap-2 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Create Course
        </Button>

        {/* Upload Step */}
        {step === "upload" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Generate Course with AI
              </h1>
              <p className="text-muted-foreground mt-2">
                Upload your PDF documents and let AI create a structured course proposal.
              </p>
            </div>

            <div
              onClick={handleFileUpload}
              className={cn(
                "rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-all",
                uploadedFiles.length > 0
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              {uploadedFiles.length > 0 ? (
                <>
                  <p className="font-semibold text-primary mb-2">
                    {uploadedFiles.length} PDF files uploaded
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {uploadedFiles.map((file, i) => (
                      <Badge key={i} variant="secondary" className="gap-1">
                        <FileText className="h-3 w-3" />
                        {file}
                      </Badge>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="font-medium mb-1">Drop PDF files here or click to upload</p>
                  <p className="text-sm text-muted-foreground">
                    AI will extract knowledge and generate a course structure
                  </p>
                </>
              )}
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-3">What AI will do:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Extract key concepts and topics from your PDFs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Generate course title and description
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Create chapter structure with summaries
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Estimate time for each chapter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Link content to source pages
                </li>
              </ul>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={uploadedFiles.length === 0}
              className="w-full gap-2"
              size="lg"
            >
              <Sparkles className="h-5 w-5" />
              Generate Course Proposal
            </Button>
          </div>
        )}

        {/* Generating Step */}
        {step === "generating" && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="relative inline-block mb-6">
                <Sparkles className="h-16 w-16 text-primary animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-2">Generating Course Proposal</h2>
              <p className="text-muted-foreground mb-6">
                AI is analyzing your documents and creating a structured course...
              </p>
              <div className="max-w-md mx-auto">
                <Progress value={generationProgress} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">{generationProgress}% complete</p>
              </div>
            </div>
          </div>
        )}

        {/* Edit Step - Vibe Edit Interface */}
        {step === "edit" && proposal && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Edit Course Proposal
                </h1>
                <p className="text-muted-foreground mt-1">
                  Review and customize your AI-generated course structure.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRegenerate} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </div>

            {/* View Mode Toggle */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "visual" | "json")}>
              <TabsList>
                <TabsTrigger value="visual" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Visual Editor
                </TabsTrigger>
                <TabsTrigger value="json" className="gap-2">
                  <Code className="h-4 w-4" />
                  JSON View
                </TabsTrigger>
              </TabsList>

              {/* Visual Editor */}
              <TabsContent value="visual" className="space-y-6 mt-6">
                {/* Course Info */}
                <div className="rounded-xl border bg-card p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course Title</label>
                    <Input
                      value={proposal.title}
                      onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                      className="text-lg font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={proposal.description}
                      onChange={(e) => setProposal({ ...proposal, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {proposal.chapters.length} chapters
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {proposal.chapters.reduce((acc, ch) => acc + ch.estimatedMinutes, 0)} min total
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {proposal.metadata.sourceDocuments.length} source files
                    </span>
                  </div>
                </div>

                {/* Chapters - Drag and Drop */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Chapters</h3>
                    <Button variant="outline" size="sm" onClick={handleAddChapter} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Chapter
                    </Button>
                  </div>

                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="chapters">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-3"
                        >
                          {proposal.chapters.map((chapter, index) => (
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
                                    "rounded-xl border bg-card transition-shadow",
                                    snapshot.isDragging && "shadow-lg"
                                  )}
                                >
                                  <div className="p-4">
                                    <div className="flex items-start gap-3">
                                      <div
                                        {...provided.dragHandleProps}
                                        className="text-muted-foreground hover:text-foreground cursor-grab mt-1"
                                      >
                                        <GripVertical className="h-5 w-5" />
                                      </div>
                                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="text-sm font-semibold text-primary">
                                          {index + 1}
                                        </span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        {editingChapter === chapter.id ? (
                                          <div className="space-y-3">
                                            <Input
                                              value={chapter.title}
                                              onChange={(e) => handleChapterEdit(chapter.id, "title", e.target.value)}
                                              className="font-medium"
                                              placeholder="Chapter title"
                                            />
                                            <Textarea
                                              value={chapter.summary}
                                              onChange={(e) => handleChapterEdit(chapter.id, "summary", e.target.value)}
                                              rows={2}
                                              placeholder="Chapter summary"
                                            />
                                            <div className="flex items-center gap-2">
                                              <Input
                                                type="number"
                                                value={chapter.estimatedMinutes}
                                                onChange={(e) => handleChapterEdit(chapter.id, "estimatedMinutes", parseInt(e.target.value) || 0)}
                                                className="w-24"
                                              />
                                              <span className="text-sm text-muted-foreground">minutes</span>
                                            </div>
                                            <Button
                                              size="sm"
                                              onClick={() => setEditingChapter(null)}
                                            >
                                              Done Editing
                                            </Button>
                                          </div>
                                        ) : (
                                          <>
                                            <h4 className="font-medium">{chapter.title}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              {chapter.summary}
                                            </p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                              {chapter.topics.map((topic, i) => (
                                                <Badge key={i} variant="secondary" className="text-xs">
                                                  {topic}
                                                </Badge>
                                              ))}
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                              <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {chapter.estimatedMinutes} min
                                              </span>
                                              {chapter.sourcePages.length > 0 && (
                                                <span>
                                                  Pages {chapter.sourcePages[0]}-{chapter.sourcePages[1]}
                                                </span>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                      <div className="flex gap-1">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => setEditingChapter(editingChapter === chapter.id ? null : chapter.id)}
                                        >
                                          <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleDeleteChapter(chapter.id)}
                                          className="text-destructive hover:text-destructive"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
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
                </div>
              </TabsContent>

              {/* JSON View */}
              <TabsContent value="json" className="mt-6">
                <div className="rounded-xl border bg-card p-4">
                  <pre className="text-sm overflow-auto max-h-[600px] p-4 bg-muted rounded-lg">
                    {JSON.stringify(proposal, null, 2)}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => navigate("/instructor/create-course")} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAccept} className="flex-1 gap-2">
                <Check className="h-4 w-4" />
                Accept & Create Course
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

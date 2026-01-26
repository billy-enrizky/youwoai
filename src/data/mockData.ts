export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  lastAccessed: string;
  coverGradient: 'indigo' | 'emerald' | 'orange' | 'blue';
  inviteCode?: string;
  totalStudents?: number;
}

export interface Chapter {
  id: string;
  title: string;
  completed: boolean;
  inProgress?: boolean;
  quizScore?: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  avgScore: number;
  lastActive: string;
  atRisk?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  citation?: string;
}

export const studentCourses: Course[] = [
  {
    id: "1",
    title: "CSC301 - Software Engineering",
    instructor: "Prof. Patricia Chen",
    progress: 75,
    lastAccessed: "2 hours ago",
    coverGradient: "indigo"
  },
  {
    id: "2",
    title: "MAT237 - Calculus II",
    instructor: "Prof. James Wilson",
    progress: 40,
    lastAccessed: "Yesterday",
    coverGradient: "emerald"
  },
  {
    id: "3",
    title: "CSC207 - Software Design",
    instructor: "Prof. Sarah Lee",
    progress: 90,
    lastAccessed: "3 days ago",
    coverGradient: "orange"
  }
];

export const courseChapters: Record<string, Chapter[]> = {
  "1": [
    { id: "1", title: "Introduction to SE", completed: true, quizScore: 85 },
    { id: "2", title: "Agile Methodology", completed: true, quizScore: 90 },
    { id: "3", title: "Version Control", completed: true, quizScore: 78 },
    { id: "4", title: "Testing Strategies", completed: false, inProgress: true },
    { id: "5", title: "Design Patterns", completed: false },
    { id: "6", title: "Final Project", completed: false }
  ],
  "2": [
    { id: "1", title: "Limits and Continuity", completed: true, quizScore: 82 },
    { id: "2", title: "Derivatives", completed: true, quizScore: 88 },
    { id: "3", title: "Integration Techniques", completed: false, inProgress: true },
    { id: "4", title: "Series and Sequences", completed: false },
    { id: "5", title: "Multivariable Calculus", completed: false }
  ],
  "3": [
    { id: "1", title: "Object-Oriented Principles", completed: true, quizScore: 95 },
    { id: "2", title: "SOLID Principles", completed: true, quizScore: 92 },
    { id: "3", title: "Design Patterns", completed: true, quizScore: 88 },
    { id: "4", title: "Clean Architecture", completed: true, quizScore: 85 },
    { id: "5", title: "Refactoring", completed: false, inProgress: true }
  ]
};

export const instructorCourses: Course[] = [
  {
    id: "1",
    title: "CSC301 - Software Engineering",
    instructor: "Prof. Patricia Chen",
    progress: 62,
    lastAccessed: "1 hour ago",
    coverGradient: "indigo",
    inviteCode: "CSC301-XK7P",
    totalStudents: 45
  },
  {
    id: "2",
    title: "CSC401 - Machine Learning",
    instructor: "Prof. Patricia Chen",
    progress: 45,
    lastAccessed: "3 hours ago",
    coverGradient: "blue",
    inviteCode: "CSC401-ML2A",
    totalStudents: 38
  }
];

export const courseStudents: Student[] = [
  { id: "1", name: "Sam Student", email: "sam.student@utoronto.ca", progress: 75, avgScore: 84, lastActive: "2 hours ago" },
  { id: "2", name: "Alex Anderson", email: "alex.a@utoronto.ca", progress: 60, avgScore: 72, lastActive: "1 day ago" },
  { id: "3", name: "Jordan Jones", email: "jordan.j@utoronto.ca", progress: 45, avgScore: 68, lastActive: "3 days ago" },
  { id: "4", name: "Taylor Thompson", email: "taylor.t@utoronto.ca", progress: 30, avgScore: 55, lastActive: "1 week ago", atRisk: true },
  { id: "5", name: "Morgan Miller", email: "morgan.m@utoronto.ca", progress: 90, avgScore: 92, lastActive: "5 hours ago" },
  { id: "6", name: "Casey Chen", email: "casey.c@utoronto.ca", progress: 82, avgScore: 88, lastActive: "1 hour ago" },
  { id: "7", name: "Drew Davis", email: "drew.d@utoronto.ca", progress: 25, avgScore: 52, lastActive: "2 weeks ago", atRisk: true },
  { id: "8", name: "Jamie Johnson", email: "jamie.j@utoronto.ca", progress: 70, avgScore: 78, lastActive: "6 hours ago" }
];

export const sampleChatMessages: ChatMessage[] = [
  { id: "1", role: "user", content: "What is mocking in testing?" },
  { id: "2", role: "ai", content: "Mocking is a technique where you create fake objects that simulate real objects in your tests. This allows you to isolate the unit being tested from its dependencies, ensuring tests are focused and reliable.", citation: "Page 45, Section 4.2" }
];

export const courseStats = {
  totalStudents: 45,
  averageProgress: "62%",
  averageScore: "74%",
  atRiskStudents: 5
};

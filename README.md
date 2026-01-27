# YouWoAI Course System - Interactive Mockup

> **Team 22 - StitchUp** | CSC301 Winter 2026

## Live Prototype

**URL**: https://youwoai.lovable.app/

This is the interactive mockup for the YouWoAI Course System MVP, demonstrating all 6 user stories.

## Features Demonstrated

### Student Features
- **Student Dashboard** (`/student`) - View enrolled courses with progress tracking
- **Course Detail** (`/student/course/:id`) - Chapter list, quiz results, AI tutor access
- **Chapter Content** (`/student/course/:courseId/chapter/:chapterId`) - Content viewer with AI chat
- **Take Quiz** (`/student/course/:courseId/chapter/:chapterId/quiz`) - Interactive quiz with results

### Instructor Features
- **Instructor Dashboard** (`/instructor`) - Student progress monitoring, analytics
- **Create Course** (`/instructor/create-course`) - 4-step wizard with drag-and-drop chapter ordering
- **Course Settings** (`/instructor/course/:id/settings`) - Invite code management, student list
- **Generate Quiz** (`/instructor/course/:id/chapter/:chapterId/generate-quiz`) - AI quiz generation

## User Stories Covered

1. **US1: Course Creation** - Instructors create courses from folders/notes
2. **US2: Student Enrollment** - Invite code based enrollment system
3. **US3: Course Content Access** - Students view chapters with AI chat
4. **US4: Progress Tracking (Student)** - Progress bars, quiz scores, continue functionality
5. **US5: Progress Dashboard (Instructor)** - Student table with sorting, filtering, CSV export
6. **US6: AI Quiz Generation** - Multiple question types with source citations

## Technology Stack

- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **React Router** - Client-side routing
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **@hello-pangea/dnd** - Drag and drop for chapter reordering
- **@tanstack/react-query** - Data fetching and caching

## Local Development

### Prerequisites
- Node.js 18+ (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or bun

### Setup

```sh
# Clone the repository
git clone https://github.com/csc301-2026-s/project-22-YouWoAI.git

# Navigate to mockup directory
cd project-22-YouWoAI/deliverables/D1/mockup-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests with Vitest |

## Project Structure

```
src/
  components/
    chat/           # AI chat panel
    course/         # Course cards, chapter items, join modal
    instructor/     # Stat cards, student table
    layout/         # Header, mobile nav
    ui/             # shadcn/ui components
  data/
    mockData.ts     # Sample data for prototype
  hooks/            # Custom React hooks
  lib/              # Utility functions
  pages/
    student/        # Student-facing pages
    instructor/     # Instructor-facing pages
  App.tsx           # Route definitions
  main.tsx          # Entry point
```

## Deployment

The prototype is deployed via Lovable.dev at https://youwoai.lovable.app/

To deploy updates:
1. Push changes to the repository
2. Lovable automatically rebuilds and deploys

## Related Documentation

- [Planning Document](../planning.md) - Full project specification
- [Mockup Document](../mockup.md) - Wireframes and architecture diagrams
- [Lovable Prompt](../lovable-prompt.md) - Original prototype specifications

## Team

- Muhammad Enrizky Brillian - Machine Learning Developer
- Robert Haughton - Full-Stack Developer
- Minseok Jang - Full-Stack Developer
- Yusheng Li - Frontend Developer
- Darryl Lubin - Full-Stack Developer
- Christian Kevin Sidharta - Frontend Developer
- Christian Jason Sumitro - Machine Learning Developer

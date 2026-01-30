import { Home, BookOpen, MessageSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const location = useLocation();
  const isInstructor = location.pathname.startsWith('/instructor');
  const basePath = isInstructor ? "/instructor" : "/student";

  const navItems = [
    { icon: Home, label: "Home", path: basePath },
    { icon: BookOpen, label: "Courses", path: basePath },
    { icon: MessageSquare, label: isInstructor ? "Analytics" : "AI Tutor", path: basePath },
    { icon: User, label: "Profile", path: basePath },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

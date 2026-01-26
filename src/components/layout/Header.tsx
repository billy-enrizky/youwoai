import { Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  showSearch?: boolean;
}

export function Header({ showSearch = true }: HeaderProps) {
  const location = useLocation();
  const isInstructor = location.pathname.startsWith('/instructor');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to={isInstructor ? "/instructor" : "/student"} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-indigo">
            <span className="text-sm font-bold text-primary-foreground">Y</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">YouWoAI</span>
        </Link>

        <div className="flex items-center gap-3">
          {showSearch && (
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Link to={isInstructor ? "/instructor" : "/student"}>
            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {isInstructor ? "PC" : "SS"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";
import { Search, ArrowUpDown, Eye, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Student } from "@/data/mockData";

interface StudentTableProps {
  students: Student[];
  courseId: string;
}

type SortKey = 'name' | 'progress' | 'avgScore' | 'lastActive';

export function StudentTable({ students, courseId }: StudentTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const filteredStudents = students
    .filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortKey === 'progress') {
        comparison = a.progress - b.progress;
      } else if (sortKey === 'avgScore') {
        comparison = a.avgScore - b.avgScore;
      } else {
        comparison = a.lastActive.localeCompare(b.lastActive);
      }
      return sortAsc ? comparison : -comparison;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const SortButton = ({ column, children }: { column: SortKey; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(column)}
      className="-ml-3 h-8 font-medium"
    >
      {children}
      <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
    </Button>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[250px]">
                <SortButton column="name">Student</SortButton>
              </TableHead>
              <TableHead>
                <SortButton column="progress">Progress</SortButton>
              </TableHead>
              <TableHead>
                <SortButton column="avgScore">Avg Score</SortButton>
              </TableHead>
              <TableHead>
                <SortButton column="lastActive">Last Active</SortButton>
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{student.name}</span>
                        {student.atRisk && (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{student.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 w-36">
                    <Progress value={student.progress} className="h-2 flex-1" />
                    <span className="text-sm font-medium w-10">{student.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "font-medium",
                    student.avgScore >= 80 ? "text-success" :
                    student.avgScore >= 60 ? "text-warning" : "text-destructive"
                  )}>
                    {student.avgScore}%
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {student.lastActive}
                </TableCell>
                <TableCell>
                  <Link to={`/instructor/course/${courseId}/student/${student.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

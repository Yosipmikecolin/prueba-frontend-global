import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    status: string;
    startDate: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const isActive = course.status === "Activo";

  return (
    <Card className="flex flex-col transition-shadow hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight text-card-foreground">
            {course.title}
          </h3>
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={
              isActive
                ? "bg-green-800"
                : "bg-muted text-muted-foreground"
            }
          >
            {course.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {course.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Inicio: {course.startDate}</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button className="flex-1">
          Registrarse
        </Button>
        <Button variant="outline" size="icon">
          <Users className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

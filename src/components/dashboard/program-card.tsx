import { Calendar, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAddProgramToStudent } from "@/services/mutation";
import useAuthStore from "@/store/auth-store";

interface CourseCardProps {
  program: Program;
}

export function ProgramCard({ program }: CourseCardProps) {
  const { mutateAsync, isPending } = useAddProgramToStudent();
  const { user, fetchUser } = useAuthStore();

  const addProgram = async (programId: string) => {
    await mutateAsync({ userId: user?.id!, programId });
    fetchUser();
  };

  const getStatusProps = (status: Program["status"]) => {
    switch (status) {
      case "easy":
        return { label: "Fácil", bgColor: "bg-green-100 text-green-600" };
      case "mid":
        return { label: "Medio", bgColor: "bg-amber-100 text-amber-600" };
      case "high":
        return { label: "Difícil", bgColor: "bg-red-100 text-red-600" };
      default:
        return { label: "Pendiente", bgColor: "bg-gray-500" };
    }
  };

  return (
    <Card className="flex flex-col transition-shadow hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="text-lg font-semibold leading-tight text-card-foreground">
            {program.name}
          </h3>
          <Badge
            className={`text-white ${getStatusProps(program.status).bgColor}`}
          >
            {getStatusProps(program.status).label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {program.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Inicio: {program.startDate}</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          disabled={user?.programs.some((i) => i.id === program.id)}
          className="flex-1"
          onClick={() => addProgram(program.id)}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : user?.programs.some((i) => i.id === program.id) ? (
            "Inscrito"
          ) : (
            "Inscribir"
          )}
        </Button>
        <Button variant="outline" size="icon">
          <Users className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

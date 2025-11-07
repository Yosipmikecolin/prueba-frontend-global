"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Program = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  status: string;
};

type Student = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  programs: Program[];
};

type ViewStudentDialogProps = {
  student: Student | null;
  onClose: () => void;
};

export function ViewStudentDialog({
  student,
  onClose,
}: ViewStudentDialogProps) {
  if (!student) return null;

  return (
    <Dialog open={student !== null} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-600">
            Detalles del Estudiante
          </DialogTitle>
          <DialogDescription>
            Información completa del estudiante
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Nombre Completo
              </p>
              <p className="font-medium">{student.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Email
              </p>
              <p className="font-medium">{student.email}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Programas Inscritos ({student.programs.length})
            </p>
            <ScrollArea className="h-max-[200px] p-3">
              <div className="space-y-2">
                {student.programs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No está inscrito en ningún programa
                  </p>
                ) : (
                  student.programs.map((program) => (
                    <Card key={program.id}>
                      <CardHeader className="px-4 ">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-sm">
                              {program.name}
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {program.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

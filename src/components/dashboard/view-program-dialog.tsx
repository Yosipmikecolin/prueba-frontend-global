"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type Program = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  status: string;
};

type ViewProgramDialogProps = {
  program: Program | null;
  onClose: () => void;
};

export function ViewProgramDialog({
  program,
  onClose,
}: ViewProgramDialogProps) {
  if (!program) return null;

  return (
    <Dialog open={program !== null} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">
            Detalles del Programa
          </DialogTitle>
          <DialogDescription>
            Información completa del programa
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Nombre
            </p>
            <p className="text-lg font-semibold">{program.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Descripción
            </p>
            <p className="text-muted-foreground">{program.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Fecha de Inicio
              </p>
              <p className="font-medium">
                {new Date(program.startDate).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Estado
              </p>
              <Badge className="bg-blue-700">{program.status}</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">ID</p>
            <p className="font-mono text-xs">{program.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

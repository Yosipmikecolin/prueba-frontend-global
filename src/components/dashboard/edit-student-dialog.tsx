"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

type EditStudentDialogProps = {
  student: Student | null;
  onClose: () => void;
  onSave: (student: Student) => void;
};

export function EditStudentDialog({
  student,
  onClose,
  onSave,
}: EditStudentDialogProps) {
  const [formData, setFormData] = useState<Student | null>(null);

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleSave = () => {
    if (formData) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={student !== null} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Editar Estudiante</DialogTitle>
          <DialogDescription>
            Actualiza la información del estudiante
          </DialogDescription>
        </DialogHeader>
        {formData && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useEffect } from "react";
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

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type EditStudentDialogProps = {
  student: User | null;
  programs: Program[];
  onClose: () => void;
  onSave: (user: User) => void;
};

const formSchema = z.object({
  fullName: z.string().min(1, "El nombre es obligatorio"),
  email: z.string(),
  programs: z.array(z.string()).min(1, "Selecciona al menos un programa"),
});

type FormValues = z.infer<typeof formSchema>;

export function EditStudentDialog({
  student,
  programs = [],
  onClose,
  onSave,
}: EditStudentDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      programs: [],
    },
  });

  useEffect(() => {
    if (student) {
      reset({
        fullName: student.fullName,
        email: student.email,
        programs: student.programs?.map((p) => p.id) ?? [],
      });
    }
  }, [student, reset]);

  const onSubmit = (data: FormValues) => {
    const updatedPrograms = programs.filter((p) =>
      data.programs.includes(p.id)
    );

    const updatedStudent: User = {
      ...student!,
      ...data,
      programs: updatedPrograms,
    };

    onSave(updatedStudent);
  };

  return (
    <Dialog open={!!student} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Editar Estudiante</DialogTitle>
          <DialogDescription>
            Actualiza la información del estudiante
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <Input id="fullName" {...register("fullName")} />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Programas Asociados</Label>

            <Controller
              control={control}
              name="programs"
              render={({ field }) => (
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto border p-3 rounded-md">
                  {programs.map((program) => (
                    <label key={program.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={program.id}
                        checked={field.value.includes(program.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, program.id]);
                          } else {
                            field.onChange(
                              field.value.filter((id) => id !== program.id)
                            );
                          }
                        }}
                      />
                      <span>{program.name}</span>
                    </label>
                  ))}
                </div>
              )}
            />

            {errors.programs && (
              <p className="text-red-500 text-sm">{errors.programs.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

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
import { Loader2 } from "lucide-react";

type CreateStudentDialogProps = {
  isPending: boolean;
  programs: Program[];
  openModal: boolean;
  onClose: () => void;
  onSave: (student: FormValues) => void;
};

const formSchema = z.object({
  fullName: z.string().min(1, "El nombre es obligatorio"),
  email: z.string(),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña es demasiado larga"),
  programIds: z.array(z.string()).min(1, "Selecciona al menos un programa"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatetStudentDialog({
  isPending,
  programs = [],
  openModal,
  onClose,
  onSave,
}: CreateStudentDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      programIds: [],
    },
  });

  const cleanInputs = () => {
    clearErrors();
    reset();
  };

  const onSubmit = (data: FormValues) => {
    cleanInputs();
    onSave(data);
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={() => {
        cleanInputs();
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Crear Estudiante</DialogTitle>
          <DialogDescription>Crea un nuevo estudiante</DialogDescription>
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
            <Input id="fullName" {...register("fullName")} maxLength={20} />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              maxLength={20}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className={errors.password ? "border-red-500" : ""}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Programas Asociados</Label>

            <Controller
              control={control}
              name="programIds"
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

            {errors.programIds && (
              <p className="text-red-500 text-sm">
                {errors.programIds.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              disabled={isPending}
              type="button"
              variant="outline"
              onClick={() => {
                cleanInputs();
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-3">
                  <span>Actualizando</span>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </div>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

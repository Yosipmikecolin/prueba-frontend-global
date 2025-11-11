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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CreateProgramDialogProps = {
  openModal: boolean;
  onClose: () => void;
  onSave: (program: Program) => void;
};

const formSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  description: z.string().min(5, "La descripción es obligatoria"),
  startDate: z.string().min(1, "La fecha es obligatoria"),
  difficulty: z.enum(["easy", "mid", "high"], "El nivel es obligatorio"),
});

type Program = z.infer<typeof formSchema>;
type FormValues = z.infer<typeof formSchema>;

export function CreateProgramDialog({
  openModal,
  onClose,
  onSave,
}: CreateProgramDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    clearErrors();
    reset();
    onSave(data);
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={() => {
        reset();
        clearErrors();
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Crear Programa</DialogTitle>
          <DialogDescription>
            Crear un nuevo programa de estudio
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" rows={3} {...register("description")} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="startDate">Fecha de Inicio</Label>
            <Input id="startDate" type="date" {...register("startDate")} />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="difficulty">Nivel de dificultad</Label>
            <Select onValueChange={(val) => setValue("difficulty", val as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="easy">Fácil</SelectItem>
                  <SelectItem value="mid">Medio</SelectItem>
                  <SelectItem value="high">Difícil</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {!watch("difficulty") && errors.difficulty && (
              <p className="text-red-500 text-sm">
                {errors.difficulty.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

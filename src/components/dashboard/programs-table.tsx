"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";
import { EditProgramDialog } from "./edit-program-dialog";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { ViewProgramDialog } from "./view-program-dialog";
import { useGetPrograms } from "@/services/queries";
import { CreateProgramDialog } from "./create-program-dialog";
import {
  useCreateProgram,
  useDeleteProgram,
  useUpdatedProgram,
} from "@/services/mutation";
import { getStatusProps, parseAxiosError } from "@/utils";
import { Pagination } from "./pagination";

export function ProgramsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [viewingProgram, setViewingProgram] = useState<Program | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { data } = useGetPrograms(currentPage, 10);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useCreateProgram();
  const { mutateAsync: mutateAsynUpdated, isPending: isPendingUpdated } =
    useUpdatedProgram();
  const { mutateAsync: mutateAsyncDelete } = useDeleteProgram();
  const [deletingProgramId, setDeletingProgramId] = useState<string | null>(
    null
  );
  const students = data?.data ?? [];
  const { lastPage: totalPages } = data?.meta ?? { lastPage: 1 };

  // ? ✅ Filtrado por búsqueda en nombre y descripción
  const filteredPrograms = students.filter(
    (program) =>
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleView = (program: Program) => setViewingProgram(program);
  const handleEdit = (program: Program) => setEditingProgram(program);

  //? Crear programa
  const onSaveProgram = async (program: CreateProgram) => {
    try {
      await mutateAsyncCreate(program);
      setOpenModal(false);
    } catch (error: any) {
      const errorMsg = parseAxiosError(error);
      toast.error(errorMsg);
    }
  };

  //? Actualizar programa
  const onUpdatedProgram = async (program: Program) => {
    try {
      const { id, ...rest } = program;
      if (editingProgram) {
        await mutateAsynUpdated({ userId: program.id, data: rest });
        setEditingProgram(null);
      }
    } catch (error: any) {
      const errorMsg = parseAxiosError(error);
      toast.error(errorMsg);
    }
  };

  //? Eliminar programa
  const handleDelete = async (id: string) => {
    try {
      await mutateAsyncDelete(id);
    } catch (error: any) {
      const errorMsg = parseAxiosError(error);
      toast.error(errorMsg);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar programas..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setOpenModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Programa
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Fecha de Inicio</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrograms.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No se encontraron programas
                </TableCell>
              </TableRow>
            ) : (
              filteredPrograms.map((program, index) => (
                <TableRow key={program.id}>
                  <TableCell className="font-mono text-xs">{index}</TableCell>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-md truncate">
                    {program.description}
                  </TableCell>
                  <TableCell>
                    {new Date(program.startDate).toLocaleDateString("es-ES", {
                      timeZone: "UTC",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-white ${
                        getStatusProps(program.difficulty).bgColor
                      }`}
                    >
                      {getStatusProps(program.difficulty).label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(program)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(program)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingProgramId(program.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CreateProgramDialog
        isPending={isPendingCreate}
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        onSave={onSaveProgram}
      />

      <EditProgramDialog
        isPending={isPendingUpdated}
        program={editingProgram}
        onClose={() => setEditingProgram(null)}
        onSave={onUpdatedProgram}
      />

      <ViewProgramDialog
        program={viewingProgram}
        onClose={() => setViewingProgram(null)}
      />

      <DeleteConfirmDialog
        open={deletingProgramId !== null}
        onClose={() => setDeletingProgramId(null)}
        onConfirm={() => deletingProgramId && handleDelete(deletingProgramId)}
        title="¿Eliminar programa?"
        description="Esta acción no se puede deshacer. El programa será eliminado permanentemente."
      />
    </div>
  );
}

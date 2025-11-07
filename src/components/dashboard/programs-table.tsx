"use client";

import { useState } from "react";
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

type Program = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  status: string;
};

const initialPrograms: Program[] = [
  {
    id: "6bb575bb-9ab3-44c6-8ace-32b155fea9ed",
    name: "Diseño UX/UI",
    description: "Crea experiencias digitales excepcionales",
    startDate: "2025-01-20",
    status: "active",
  },
  {
    id: "7cc686cc-0bc4-55d7-9bdf-43c266gfb0fe",
    name: "Desarrollo Web Full Stack",
    description:
      "Aprende a crear aplicaciones web modernas con React, Node.js y MongoDB",
    startDate: "2025-02-01",
    status: "active",
  },
  {
    id: "8dd797dd-1cd5-66e8-0ceg-54d377hgc1gf",
    name: "Data Science con Python",
    description: "Domina el análisis de datos y machine learning con Python",
    startDate: "2025-03-15",
    status: "upcoming",
  },
  {
    id: "9ee808ee-2de6-77f9-1dfh-65e488ihd2hg",
    name: "Marketing Digital",
    description: "Estrategias de marketing en la era digital",
    startDate: "2025-04-01",
    status: "upcoming",
  },
  {
    id: "0ff919ff-3ef7-88g0-2egi-76f599jie3ih",
    name: "DevOps y Cloud Computing",
    description: "Infraestructura moderna y despliegue continuo",
    startDate: "2025-02-15",
    status: "active",
  },
];

export function ProgramsTable() {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [viewingProgram, setViewingProgram] = useState<Program | null>(null);
  const [deletingProgramId, setDeletingProgramId] = useState<string | null>(
    null
  );

  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
  };

  const handleSaveEdit = (updatedProgram: Program) => {
    setPrograms(
      programs.map((p) => (p.id === updatedProgram.id ? updatedProgram : p))
    );
    setEditingProgram(null);
  };

  const handleDelete = (id: string) => {
    setPrograms(programs.filter((p) => p.id !== id));
    setDeletingProgramId(null);
  };

  const handleView = (program: Program) => {
    setViewingProgram(program);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar programas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
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
              <TableHead>Estado</TableHead>
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
                    {new Date(program.startDate).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-700">{program.status}</Badge>
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

      <EditProgramDialog
        program={editingProgram}
        onClose={() => setEditingProgram(null)}
        onSave={handleSaveEdit}
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

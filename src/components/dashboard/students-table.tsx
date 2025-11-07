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
import { EditStudentDialog } from "./edit-student-dialog";
import { ViewStudentDialog } from "./view-student-dialog";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";

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

const initialStudents: Student[] = [
  {
    id: "6bb575bb-9ab3-44c6-8ace-32b155fea9ed",
    email: "juan.perez@email.com",
    fullName: "Juan Pérez García",
    role: "student",
    programs: [
      {
        id: "1",
        name: "Diseño UX/UI",
        description: "Crea experiencias digitales excepcionales",
        startDate: "2025-01-20",
        status: "active",
      },
    ],
  },
  {
    id: "7cc686cc-0bc4-55d7-9bdf-43c266gfb0fe",
    email: "maria.lopez@email.com",
    fullName: "María López Rodríguez",
    role: "student",
    programs: [
      {
        id: "2",
        name: "Desarrollo Web Full Stack",
        description: "Aprende a crear aplicaciones web modernas",
        startDate: "2025-02-01",
        status: "active",
      },
      {
        id: "3",
        name: "Data Science con Python",
        description: "Domina el análisis de datos",
        startDate: "2025-03-15",
        status: "upcoming",
      },
    ],
  },
  {
    id: "8dd797dd-1cd5-66e8-0ceg-54d377hgc1gf",
    email: "carlos.martin@email.com",
    fullName: "Carlos Martín Sánchez",
    role: "student",
    programs: [],
  },
];

export function StudentsTable() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(
    null
  );

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleSaveEdit = (updatedStudent: Student) => {
    setStudents(
      students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    setEditingStudent(null);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
    setDeletingStudentId(null);
  };

  const handleView = (student: Student) => {
    setViewingStudent(student);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Estudiante
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Programas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No se encontraron estudiantes
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student,index) => (
                <TableRow key={student.id}>
                  <TableCell className="font-mono text-xs">
                    {index}
                  </TableCell>
                  <TableCell className="font-medium">
                    {student.fullName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{student.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {student.programs.length} programa(s)
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(student)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingStudentId(student.id)}
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

      <EditStudentDialog
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={handleSaveEdit}
      />

      <ViewStudentDialog
        student={viewingStudent}
        onClose={() => setViewingStudent(null)}
      />

      <DeleteConfirmDialog
        open={deletingStudentId !== null}
        onClose={() => setDeletingStudentId(null)}
        onConfirm={() => deletingStudentId && handleDelete(deletingStudentId)}
        title="¿Eliminar estudiante?"
        description="Esta acción no se puede deshacer. El estudiante será eliminado permanentemente."
      />
    </div>
  );
}

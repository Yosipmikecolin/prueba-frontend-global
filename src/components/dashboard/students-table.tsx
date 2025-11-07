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
import { useGetPrograms, useGetUsers } from "@/services/queries";
import { Pagination } from "./pagination";
import { useUpdatedStudent } from "@/services/mutation";

export function StudentsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingStudent, setEditingStudent] = useState<User | null>(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { data: programs } = useGetPrograms(1, 10);
  const { mutateAsync } = useUpdatedStudent();
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  // ? ✅ Consultar la paginación real desde backend
  const { data, isLoading } = useGetUsers(currentPage, 10);

  const students = data?.data ?? [];
  const { lastPage: totalPages } = data?.meta ?? { lastPage: 1 };

  // ? ✅ Filtrado por búsqueda en nombre y email
  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleView = (student: any) => setViewingStudent(student);
  const handleEdit = (student: any) => setEditingStudent(student);
  const handleDelete = (id: string) => {
    console.log("Eliminar:", id);
  };

  const onSaveStudent = async (student: User) => {
    if (editingStudent) {
      const { fullName, email, programs } = student;
      const user = {
        userId: student.id,
        data: { fullName, email, programIds: programs.map((i) => i.id) },
      };
      await mutateAsync(user);
      setEditingStudent(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar estudiantes..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button onClick={() => setOpenModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Estudiante
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Programas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No se encontraron estudiantes
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {student.fullName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-700">{student.role}</Badge>
                  </TableCell>
                  <TableCell>{student.programs.length} programa(s)</TableCell>
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <EditStudentDialog
        programs={programs?.data || []}
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={onSaveStudent}
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
        description="Esta acción no se puede deshacer."
      />
    </div>
  );
}

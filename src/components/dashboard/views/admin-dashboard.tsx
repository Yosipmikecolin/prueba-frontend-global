"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "../header";
import { StudentsTable } from "../students-table";
import { ProgramsTable } from "../programs-table";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header text="Dashboard Administrador" />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="students">Estudiantes</TabsTrigger>
            <TabsTrigger value="programs">Programas</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <StudentsTable />
          </TabsContent>

          <TabsContent value="programs" className="mt-6">
            <ProgramsTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

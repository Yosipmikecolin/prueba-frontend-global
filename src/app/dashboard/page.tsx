"use client";

import { useState } from "react";
import { Header } from "../../components/dashboard/header";
import { SearchBar } from "../../components/dashboard/search-bar";
import { CourseGrid } from "../../components/dashboard/course-grid";
import { Pagination } from "../../components/dashboard/pagination";

const allCourses = [
  {
    id: 1,
    title: "Desarrollo Web Full Stack",
    description:
      "Aprende a crear aplicaciones web modernas con React, Node.js y MongoDB",
    status: "Activo",
    startDate: "2025-02-01",
  },
  {
    id: 2,
    title: "Data Science con Python",
    description: "Domina el análisis de datos y machine learning con Python",
    status: "Próximamente",
    startDate: "2025-03-15",
  },
  {
    id: 3,
    title: "Diseño UX/UI",
    description: "Crea experiencias digitales excepcionales",
    status: "Activo",
    startDate: "2025-01-20",
  },
  {
    id: 4,
    title: "Marketing Digital",
    description: "Estrategias de marketing en la era digital",
    status: "Próximamente",
    startDate: "2025-04-01",
  },
  {
    id: 5,
    title: "DevOps y Cloud Computing",
    description: "Infraestructura moderna y despliegue continuo",
    status: "Activo",
    startDate: "2025-02-15",
  },
  {
    id: 6,
    title: "Inteligencia Artificial",
    description: "Fundamentos y aplicaciones de IA moderna",
    status: "Activo",
    startDate: "2025-03-01",
  },
  {
    id: 7,
    title: "Desarrollo Mobile",
    description: "Crea apps nativas con React Native",
    status: "Próximamente",
    startDate: "2025-05-01",
  },
  {
    id: 8,
    title: "Ciberseguridad",
    description: "Protege sistemas y datos en el mundo digital",
    status: "Activo",
    startDate: "2025-02-20",
  },
];

const ITEMS_PER_PAGE = 6;

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Inscritos");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter courses based on search and status
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "Inscritos" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
        />

        <CourseGrid courses={currentCourses} />

        {filteredCourses.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
}

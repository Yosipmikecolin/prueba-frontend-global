"use client";

import { useState } from "react";
import { Header } from "../../components/dashboard/header";
import { SearchBar } from "../../components/dashboard/search-bar";
import { ProgramGrid } from "../../components/dashboard/program-grid";
import { Pagination } from "../../components/dashboard/pagination";
import { useGetPrograms } from "@/services/queries";

const ITEMS_PER_PAGE = 10;

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Inscritos");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetPrograms();
  const programs = data?.data ?? [];

  // ? 1) Filtro limpio y robusto
  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "Inscritos" || program.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ? 2) Paginación segura
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE)
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPrograms = filteredPrograms.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // ? 3) Reseteo de página al cambiar filtros
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

      {isLoading ? (
        <div className="p-6 text-center h-[700px] flex justify-center items-center">
          <span>Cargando programas…</span>
        </div>
      ) : (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
          />

          <ProgramGrid programs={currentPrograms} />

          {filteredPrograms.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      )}
    </div>
  );
}

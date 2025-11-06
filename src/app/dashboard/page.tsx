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
  const { data, isLoading } = useGetPrograms(currentPage, ITEMS_PER_PAGE);
  const programs = data?.data ?? [];
  const { lastPage } = data?.meta ?? { lastPage: 1 };

  // ? Filtrado
  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "Inscritos" || program.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const currentPrograms = filteredPrograms;
  const totalPages = lastPage;

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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      )}
    </div>
  );
}

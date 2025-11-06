import { ProgramCard } from "./program-card";

interface ProgramGridProps {
  programs: Program[];
}

export function ProgramGrid({ programs }: ProgramGridProps) {
  if (programs.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">No se encontraron programas</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
}

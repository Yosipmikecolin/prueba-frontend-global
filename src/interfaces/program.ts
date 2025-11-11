interface ProgramResponse {
  data: Program[];
  meta: Meta;
}

interface Program {
  id: string;
  name: string;
  description: string;
  startDate: string;
  status: string;
  difficulty: string;
}

interface Meta {
  total: number;
  page: number;
  lastPage: number;
}

interface CreateProgram {
  name: string;
  description: string;
  startDate: string;
  status: "easy" | "mid" | "high";
}

interface CreateStuden {
  fullName: string;
  email: string;
  programIds: string[];
}

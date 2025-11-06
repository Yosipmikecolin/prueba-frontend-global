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
}

interface Meta {
  total: number;
  page: number;
  lastPage: number;
}

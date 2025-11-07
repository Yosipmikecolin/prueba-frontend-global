interface UserResponse {
  data: User[];
  meta: Meta;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  programs: Program[];
}

interface Meta {
  total: number;
  page: number;
  lastPage: number;
}

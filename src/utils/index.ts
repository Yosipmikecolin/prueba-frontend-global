export const getStatusProps = (status: Program["difficulty"]) => {
  switch (status) {
    case "easy":
      return { label: "Fácil", bgColor: "bg-green-100 text-green-600" };
    case "mid":
      return { label: "Medio", bgColor: "bg-amber-100 text-amber-600" };
    case "high":
      return { label: "Difícil", bgColor: "bg-red-100 text-red-600" };
    default:
      return { label: "Pendiente", bgColor: "bg-gray-500" };
  }
};

export const parseAxiosError = (error: any): string => {
  if (!error) return "Error desconocido";

  const response = error?.response?.data;

  // ? Caso típico de validaciones (class-validator / DTO):
  if (Array.isArray(response?.message)) {
    return response.message.join(", ");
  }

  // ? Cuando la respuesta viene en: data.message (string simple)
  if (typeof response?.message === "string") {
    return response.message;
  }

  // ? Cuando viene en data.errors (como array tipo Postgres/ORM)
  if (Array.isArray(response?.errors) && response.errors.length > 0) {
    return response.errors[0];
  }

  // ? Mensajes de base de datos directos (ej: Postgres Unique Constraint)
  if (typeof response === "string") {
    return response;
  }

  // ? Mensaje genérico de Axios (por si algo raro pasa)
  return error?.message || "Ocurrió un error inesperado";
};

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

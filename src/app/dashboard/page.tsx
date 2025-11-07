"use client";

import AdminDashboard from "@/components/dashboard/views/admin-dashboard";
import StudentDashboard from "@/components/dashboard/views/student-dashboard";
import useAuthStore from "@/store/auth-store";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-medium">Cargando...</p>
      </div>
    );
  }

  return user.role === "admin" ? <AdminDashboard /> : <StudentDashboard />;
}

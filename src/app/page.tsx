import { LoginForm } from "@/components/auth/login-form";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            CodeAcademy 💻
          </h1>
          <p className="text-black">
            Inicia sesión para acceder a tu plataforma de aprendizaje
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

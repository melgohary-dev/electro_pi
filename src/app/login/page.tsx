"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <AuthForm mode="login" onSubmit={(values) => login(values.email, values.password)} />
  );
}

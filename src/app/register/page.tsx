"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();

  return (
    <AuthForm
      mode="register"
      onSubmit={(values) => register(values.email, values.password, values.name!)}
    />
  );
}

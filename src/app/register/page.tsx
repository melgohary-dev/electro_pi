"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthForm, AuthMode } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/hooks/useAppStore";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const { user, isLoading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || user) return null;

  return (
    <AuthForm
      mode={AuthMode.REGISTER}
      onSubmit={(values) => register(values.email, values.password, values.name!)}
    />
  );
}

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "./useAppStore";
import { setUser, logout as logoutAction } from "@/store/slices/authSlice";
import { apiClient } from "@/lib/api-client";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isLoading } = useAppSelector((s) => s.auth);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data } = await apiClient.post("/auth/login", {
        email,
        password,
      });
      dispatch(setUser(data.user));
      router.push("/");
    },
    [dispatch, router],
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const { data } = await apiClient.post("/auth/register", {
        email,
        password,
        name,
      });
      dispatch(setUser(data.user));
      router.push("/");
    },
    [dispatch, router],
  );

  const logout = useCallback(async () => {
    await apiClient.post("/auth/logout");
    dispatch(logoutAction());
    router.push("/login");
  }, [dispatch, router]);

  return { user, isLoading, login, register, logout };
}

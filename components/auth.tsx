"use client";
import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

type User = { name: string; email: string };
type AuthState = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};
const C = createContext<AuthState>({
  user: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();
  const logout = async () => {
    await authClient.signOut();
  };
  return (
    <C.Provider
      value={{ user: data?.user ?? null, loading: isPending, logout }}
    >
      {children}
    </C.Provider>
  );
}
export const useAuth = () => useContext(C);

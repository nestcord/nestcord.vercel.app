"use client";

import { createContext, useContext } from "react";
import useSWR from "swr";

import type { UserType } from "@/lib/types";

type UserContextType = {
  user: UserType | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch user data");
  return res.json();
};

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useSWR("/api/user/session", fetcher, {
    revalidateOnFocus: true,
  });

  const user = data || null;
  
  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  
  if (!context) {
    console.warn("useUser debe usarse dentro de un UserProvider");
    return { user: null, isLoading: true };
  }
  return context;
}

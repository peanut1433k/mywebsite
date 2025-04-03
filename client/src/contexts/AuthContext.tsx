import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { AuthMode } from "@/components/auth/AuthModals";
import { User } from "@shared/schema";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/user");
        if (!res.ok) {
          return null;
        }
        return res.json();
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const logout = async () => {
    try {
      await apiRequest("POST", "/api/logout");
      queryClient.setQueryData(["/api/user"], null);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    authMode,
    setAuthMode,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export type AuthMode = "login" | "register" | null;

interface AuthModalsProps {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

export function AuthModals({ mode, setMode }: AuthModalsProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.username}!`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setMode(null);
      setUsername("");
      setPassword("");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully. Please log in.",
      });
      setMode("login");
      setUsername("");
      setPassword("");
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please try a different username.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }
    
    if (mode === "login") {
      loginMutation.mutate({ username, password });
    } else if (mode === "register") {
      registerMutation.mutate({ username, password });
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <Dialog open={mode !== null} onOpenChange={(open) => !open && setMode(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? "Login to Your Account" : "Create an Account"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login" 
              ? "Sign in to save your work and track your progress." 
              : "Join us to save your projects and track your learning journey."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              disabled={isLoading}
            >
              {mode === "login" ? "Need an account?" : "Already have an account?"}
            </Button>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : mode === "login" ? "Login" : "Register"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
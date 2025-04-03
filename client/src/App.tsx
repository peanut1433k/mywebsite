import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Examples from "./pages/Examples";
import Practice from "./pages/Practice";
import Resources from "./pages/Resources";
import MyProjects from "./pages/MyProjects";
import UserProfile from "./pages/UserProfile";
import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { useLocation } from "wouter";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthModals } from "./components/auth/AuthModals";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Auth modals wrapper component
const AuthModalsWrapper = () => {
  const { authMode, setAuthMode } = useAuth();
  return <AuthModals mode={authMode} setMode={setAuthMode} />;
};

function App() {
  const [location] = useLocation();
  const key = useMemo(() => location, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <AnimatePresence mode="wait">
            <Switch key={key}>
              <Route path="/" component={Home} />
              <Route path="/examples" component={Examples} />
              <Route path="/practice" component={Practice} />
              <Route path="/resources" component={Resources} />
              <Route path="/my-projects" component={MyProjects} />
              <Route path="/profile" component={UserProfile} />
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        </Layout>
        <AuthModalsWrapper />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

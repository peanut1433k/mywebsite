import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, LogOut, User, User as UserIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, authMode, setAuthMode, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location === path;
  
  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-primary to-indigo-500 text-white p-2 rounded">
            <i className="fas fa-code text-xl"></i>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
            HTMLPractice
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={cn(
              "transition-colors",
              isActive("/") ? "text-primary font-medium" : "text-gray-800 hover:text-primary"
            )}
          >
            Home
          </Link>
          <Link 
            href="/examples" 
            className={cn(
              "transition-colors",
              isActive("/examples") ? "text-primary font-medium" : "text-gray-800 hover:text-primary"
            )}
          >
            Examples
          </Link>
          <Link 
            href="/practice" 
            className={cn(
              "transition-colors",
              isActive("/practice") ? "text-primary font-medium" : "text-gray-800 hover:text-primary"
            )}
          >
            Practice
          </Link>
          <Link 
            href="/resources" 
            className={cn(
              "transition-colors",
              isActive("/resources") ? "text-primary font-medium" : "text-gray-800 hover:text-primary"
            )}
          >
            Resources
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden md:flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/my-projects">
                  <DropdownMenuItem className="cursor-pointer">
                    My Saved Projects
                  </DropdownMenuItem>
                </Link>
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hidden md:inline-flex"
                onClick={() => setAuthMode("login")}
              >
                Login
              </Button>
              <Button 
                className="hidden md:inline-flex"
                onClick={() => setAuthMode("register")}
              >
                Sign Up Free
              </Button>
            </>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              onClick={closeMenu}
              className={cn(
                "transition-colors",
                isActive("/") ? "text-primary font-medium" : "text-gray-800 hover:text-primary"
              )}
            >
              Home
            </Link>
            <Link 
              href="/examples" 
              onClick={closeMenu}
              className={cn(
                "transition-colors",
                isActive("/examples") ? "text-primary font-medium" : "text-gray-800 hover:text-primary"
              )}
            >
              Examples
            </Link>
            <Link 
              href="/practice" 
              onClick={closeMenu}
              className={cn(
                "transition-colors",
                isActive("/practice") ? "text-primary font-medium" : "text-gray-800 hover:text-primary"
              )}
            >
              Practice
            </Link>
            <Link 
              href="/resources" 
              onClick={closeMenu}
              className={cn(
                "transition-colors",
                isActive("/resources") ? "text-primary font-medium" : "text-gray-800 hover:text-primary"
              )}
            >
              Resources
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  href="/my-projects" 
                  onClick={closeMenu}
                  className="text-gray-800 hover:text-primary"
                >
                  My Saved Projects
                </Link>
                <Link 
                  href="/profile" 
                  onClick={closeMenu}
                  className="text-gray-800 hover:text-primary"
                >
                  Profile Settings
                </Link>
                <Button className="w-full" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full mb-2" variant="outline" onClick={() => {
                  setAuthMode("login");
                  closeMenu();
                }}>
                  Login
                </Button>
                <Button className="w-full" onClick={() => {
                  setAuthMode("register");
                  closeMenu();
                }}>
                  Sign Up Free
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

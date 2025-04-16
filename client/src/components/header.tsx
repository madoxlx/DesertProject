import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@/assets/logo.png";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    setLocation('/');
  };

  const getInitials = (name: string | null = '') => {
    if (!name) return 'U'; // Default to 'U' for user
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src={logoImage} alt="EgyptExpressTVL Logo" className="h-10 mr-2" />
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="fas fa-bars text-gray-600"></i>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-primary font-medium">
            Home
          </Link>
          <Link href="/" className="text-gray-700 hover:text-primary font-medium">
            Destinations
          </Link>
          <Link href="/" className="text-gray-700 hover:text-primary font-medium">
            Offers
          </Link>
          <Link href="/about-us" className="text-gray-700 hover:text-primary font-medium">
            About Us
          </Link>
          <Link href="/contact-us" className="text-gray-700 hover:text-primary font-medium">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">{user.firstName || user.username}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-0 rounded-full h-9 w-9 hover:bg-gray-100">
                    <Avatar>
                      <AvatarImage src="" alt={user.username} />
                      <AvatarFallback className="bg-primary text-white">
                        {getInitials(user.firstName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation('/profile')}>
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary text-white rounded-full hover:bg-blue-700">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`px-4 pt-2 pb-4 md:hidden ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <Link href="/" className="block py-2 text-gray-700 hover:text-primary font-medium">
          Home
        </Link>
        <Link href="/" className="block py-2 text-gray-700 hover:text-primary font-medium">
          Destinations
        </Link>
        <Link href="/" className="block py-2 text-gray-700 hover:text-primary font-medium">
          Offers
        </Link>
        <Link href="/about-us" className="block py-2 text-gray-700 hover:text-primary font-medium">
          About Us
        </Link>
        <Link href="/contact-us" className="block py-2 text-gray-700 hover:text-primary font-medium">
          Contact
        </Link>
        {isAuthenticated && user ? (
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 py-2">
              <Avatar>
                <AvatarImage src="" alt={user.username} />
                <AvatarFallback className="bg-primary text-white">
                  {getInitials(user.firstName)}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-700 font-medium">{user.firstName || user.username}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary"
                onClick={() => setLocation('/profile')}
              >
                My Profile
              </Button>
              <Button 
                className="w-full bg-primary text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex space-x-2">
            <Link href="/login" className="w-1/2">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-full">
                Login
              </Button>
            </Link>
            <Link href="/register" className="w-1/2">
              <Button className="w-full bg-primary text-white rounded-full hover:bg-blue-700">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

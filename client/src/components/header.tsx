import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <i className="fas fa-globe text-primary text-2xl mr-2"></i>
            <span className="text-xl font-bold text-primary">TravelEast</span>
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
          <Link href="/destinations" className="text-gray-700 hover:text-primary font-medium">
            Destinations
          </Link>
          <Link href="/offers" className="text-gray-700 hover:text-primary font-medium">
            Offers
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-primary font-medium">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-primary font-medium">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full">
            Log In
          </Button>
          <Button className="bg-primary text-white rounded-full hover:bg-blue-700">
            Sign Up
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`px-4 pt-2 pb-4 md:hidden ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <Link href="/" className="block py-2 text-gray-700 hover:text-primary font-medium">
          Home
        </Link>
        <Link href="/destinations" className="block py-2 text-gray-700 hover:text-primary font-medium">
          Destinations
        </Link>
        <Link href="/offers" className="block py-2 text-gray-700 hover:text-primary font-medium">
          Offers
        </Link>
        <Link href="/about" className="block py-2 text-gray-700 hover:text-primary font-medium">
          About Us
        </Link>
        <Link href="/contact" className="block py-2 text-gray-700 hover:text-primary font-medium">
          Contact
        </Link>
        <div className="mt-4 flex space-x-2">
          <Button variant="outline" className="w-1/2 border-primary text-primary hover:bg-primary hover:text-white rounded-full">
            Log In
          </Button>
          <Button className="w-1/2 bg-primary text-white rounded-full hover:bg-blue-700">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}

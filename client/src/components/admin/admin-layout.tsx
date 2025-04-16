import { ReactNode } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="ml-64 min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.location.href = "/"}
            >
              <i className="fas fa-external-link-alt"></i>
              View Site
            </Button>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
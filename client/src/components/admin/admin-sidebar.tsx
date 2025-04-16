import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/admin", icon: "dashboard" },
  { label: "Users Management", href: "/admin/users", icon: "people" },
  { label: "Users Management", href: "/admin/users", icon: "people" },
  { label: "Blogs", href: "/admin/blogs", icon: "article" },
  { label: "Packages", href: "/admin/packages", icon: "backpack" },
  { label: "Tours", href: "/admin/tours", icon: "tour" },
  { label: "Locations", href: "/admin/locations", icon: "place" },
  { label: "Destinations", href: "/admin/destinations", icon: "flight" },
];

export function AdminSidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-gray-900 text-white flex flex-col">
      <div className="p-6 flex items-center justify-center flex-col">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-3">
          <i className="fas fa-user text-3xl text-primary"></i>
        </div>
        <h2 className="text-lg font-bold">Admin User</h2>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <a
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    location === item.href
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  )}
                >
                  <i className={`fas fa-${item.icon} w-5 h-5 mr-2`}></i>
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:text-white rounded-md hover:bg-gray-800 transition-colors">
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </div>
    </aside>
  );
}
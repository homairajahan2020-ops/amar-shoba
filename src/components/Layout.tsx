import { Home, MessageCircle, Wallet, Grid3x3 } from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "হোম", labelEn: "Home", path: "/" },
  { icon: MessageCircle, label: "বার্তা", labelEn: "Messages", path: "/messages" },
  { icon: Wallet, label: "ওয়ালেট", labelEn: "Wallet", path: "/wallet" },
  { icon: Grid3x3, label: "সেবা", labelEn: "Services", path: "/services" },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold font-bengali text-foreground leading-none">
                বাংলাকানেক্ট
              </h1>
              <p className="text-xs text-muted-foreground">BanglaConnect</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 max-w-6xl mx-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card shadow-elegant md:hidden">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
                <span className={cn(
                  "text-xs font-medium font-bengali",
                  isActive && "font-semibold"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 border-r bg-card p-4 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-elegant" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <div className="flex flex-col">
                <span className="font-medium font-bengali">{item.label}</span>
                <span className="text-xs opacity-80">{item.labelEn}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

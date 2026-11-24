import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, MessageSquare, Calendar, User, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out successfully" });
    navigate("/auth");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border bg-card shadow-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-purple">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Ask PV
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {user && (
                <>
                  <Link to="/ask">
                    <Button variant={isActive("/ask") ? "default" : "ghost"} className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Ask
                    </Button>
                  </Link>
                  <Link to="/plan">
                    <Button variant={isActive("/plan") ? "default" : "ghost"} className="gap-2">
                      <Calendar className="w-4 h-4" />
                      Plan Schedule
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant={isActive("/profile") ? "default" : "ghost"} className="gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleSignOut} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              )}
              {!user && (
                <Link to="/auth">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-2">
              {user && (
                <>
                  <Link to="/ask" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant={isActive("/ask") ? "default" : "ghost"} className="w-full gap-2 justify-start">
                      <MessageSquare className="w-4 h-4" />
                      Ask
                    </Button>
                  </Link>
                  <Link to="/plan" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant={isActive("/plan") ? "default" : "ghost"} className="w-full gap-2 justify-start">
                      <Calendar className="w-4 h-4" />
                      Plan Schedule
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant={isActive("/profile") ? "default" : "ghost"} className="w-full gap-2 justify-start">
                      <User className="w-4 h-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleSignOut} className="w-full gap-2 justify-start">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              )}
              {!user && (
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Sign In</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Ask PV - Prairie View A&M University Assistant
        </div>
      </footer>
    </div>
  );
};


import CrumbList from "@/components/CrumbList";
import LearningTopics from "@/components/LearningTopics";
import { Cookie } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await import("@/integrations/supabase/client").then(({ supabase }) =>
      supabase.auth.signOut()
    );
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-fuchsia-50 flex flex-col pb-10">
      <header className="w-full px-8 py-4 mb-6 flex items-center justify-between bg-white border-b border-muted shadow-[0_3px_12px_-7px_rgba(80,80,180,0.08)]">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-gradient-to-tr from-fuchsia-600 to-primary p-2 shadow hover-scale">
            <Cookie size={32} className="text-white" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-primary font-sans">
            Crumbs
          </span>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="font-medium text-base text-muted-foreground">
                Hi!
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-fuchsia-600 text-fuchsia-600 font-semibold hover:bg-fuchsia-50 rounded-full transition-all"
                size="sm"
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-fuchsia-600 text-white font-bold px-6 py-2 rounded-full shadow hover:bg-fuchsia-700 transition-colors"
              size="sm"
            >
              Log In / Sign Up
            </Button>
          )}
        </div>
      </header>
      <main className="flex-1 flex flex-col gap-8 items-center max-w-6xl mx-auto w-full px-2">
        <div className="w-full animate-fade-in">
          <CrumbList />
        </div>
        <div className="w-full animate-fade-in">
          <LearningTopics />
        </div>
      </main>
    </div>
  );
};

export default Index;

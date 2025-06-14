
// Provides user and session, handles refreshes.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSupabaseAuth() {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  return { user, session };
}

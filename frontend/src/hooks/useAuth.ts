import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useSupabaseAuth() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function register(
    email: string,
    password: string,
    meta?: { nombre?: string; apellido?: string }
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: meta?.nombre || "",
          apellido: meta?.apellido || "",
        },
      },
    });
    setUser(data?.user ?? null);
    setError(error?.message ?? null);
    return { user: data?.user, error };
  }

  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(data?.user ?? null);
    setError(error?.message ?? null);
    return { user: data?.user, error };
  }

  return { user, error, register, login };
}

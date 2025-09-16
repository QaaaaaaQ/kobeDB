import { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getEnvVar(keys: string[]): string | undefined {
  try { if (typeof process !== 'undefined' && (process as any).env) {
    for (const k of keys) { const v = (process as any).env[k]; if (v) return String(v); }
  }} catch {}
  try { if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    const env = (import.meta as any).env; for (const k of keys) { const v = env[k]; if (v) return String(v); }
  }} catch {}
  if (typeof window !== 'undefined' && (window as any).__ENV) {
    const env = (window as any).__ENV; for (const k of keys) { const v = env[k]; if (v) return String(v); }
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    for (const k of keys) { const v = window.localStorage.getItem(k) || undefined; if (v) return v; }
  }
  return undefined;
}

function resolveSupabaseConfig(): { url: string; anonKey: string } | null {
  const url = getEnvVar(['VITE_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_URL','SB_URL']);
  const anonKey = getEnvVar(['VITE_SUPABASE_ANON_KEY','NEXT_PUBLIC_SUPABASE_ANON_KEY','SB_ANON']);
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function useSupabaseEnv() {
  const [sb, setSb] = useState<SupabaseClient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle'|'ready'|'missing'>('idle');

  useEffect(() => {
    const cfg = resolveSupabaseConfig();
    if (!cfg) { setStatus('missing'); return; }
    try {
      setSb(createClient(cfg.url, cfg.anonKey));
      setStatus('ready');
    } catch (e: any) {
      setError(e?.message || String(e));
      setStatus('missing');
    }
  }, []);

  return { sb, status, error };
}

import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const supabaseUrl = rawUrl && !rawUrl.startsWith('http')
  ? `https://${rawUrl}.supabase.co`
  : rawUrl ?? '';

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  key || 'placeholder-key'
);

export const isSupabaseConfigured =
  !!supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co';

export interface Booking {
  id?: string;
  name: string;
  phone: string;
  service: string;
  branch: string;
  date: string;
  time: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
}

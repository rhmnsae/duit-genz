import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseReady = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseReady
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;

export async function saveTransaction(payload) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') };
  return supabase.from('transactions').insert(payload).select().single();
}

export async function saveSplitBill(payload) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') };
  return supabase.from('split_bills').insert(payload).select().single();
}

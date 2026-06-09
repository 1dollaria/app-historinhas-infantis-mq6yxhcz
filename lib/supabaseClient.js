// Cliente Supabase para o app nativo (React Native + Expo).
// As chaves vêm de variáveis EXPO_PUBLIC_* (injetadas no .env pelo 1dollar).
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl) {
  console.warn(
    '[supabase] EXPO_PUBLIC_SUPABASE_URL não definido — chamadas vão falhar até o .env ser injetado.',
  );
}

// Guard: createClient lança se a URL for vazia; placeholder evita quebrar no mount.
export const supabase = supabaseUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-anon-key');

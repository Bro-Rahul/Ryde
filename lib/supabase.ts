import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PUBLIC_URL!
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_PUBLIC_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
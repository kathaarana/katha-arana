const SUPABASE_URL =
    "https://klovgoywctcezqgyougv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_RcvNjAOkExmL33MjjQNlaw_Qhl4xUu2";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
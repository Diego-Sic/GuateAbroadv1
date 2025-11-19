import { createClient } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Try to get profile from database
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  // If profile exists in database, return it
  if (profile) {
    return profile;
  }

  // Return a fallback profile using auth user data
  // This allows the profile page to work before the users table is set up
  return {
    id: user.id,
    email: user.email || '',
    username: user.user_metadata?.username || user.email?.split('@')[0] || 'User',
    full_name: user.user_metadata?.full_name || null,
    avatar_url: user.user_metadata?.avatar_url || null,
    bio: null,
    location: null,
    website: null,
    graduation_year: null,
    target_universities: null,
    interests: null,
    email_verified: user.email_confirmed_at ? true : false,
    reputation_score: 0,
    created_at: user.created_at,
    updated_at: user.updated_at || user.created_at,
    last_login: new Date().toISOString(),
  };
}

export async function requireAuth() {
  const user = await getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

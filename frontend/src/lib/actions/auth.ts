'use server';

import { createClient } from '@/lib/supabase/server';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';
import { redirect } from 'next/navigation';

export type AuthActionResult = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function signUp(
  data: RegisterFormData
): Promise<AuthActionResult> {
  // Validate input
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0]?.message || 'Invalid input',
    };
  }

  const { email, password, username } = validatedFields.data;

  const supabase = await createClient();

  // Check if username is already taken
  const { data: existingUser } = await supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .single();

  if (existingUser) {
    return {
      success: false,
      error: 'Username is already taken',
    };
  }

  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: {
        username,
      },
    },
  });

  if (authError) {
    // Handle specific Supabase errors
    if (authError.message.includes('already registered')) {
      return {
        success: false,
        error: 'An account with this email already exists',
      };
    }
    return {
      success: false,
      error: authError.message,
    };
  }

  if (!authData.user) {
    return {
      success: false,
      error: 'Failed to create account',
    };
  }

  // Create user profile in database
  const { error: profileError } = await supabase.from('users').insert({
    id: authData.user.id,
    email: authData.user.email!,
    username,
    email_verified: false,
  });

  if (profileError) {
    // Log error but don't fail - the trigger should handle this as backup
    console.error('Error creating user profile:', profileError);
  }

  // Check if email confirmation is required
  if (authData.user.identities?.length === 0) {
    return {
      success: true,
      message: 'Please check your email to confirm your account',
    };
  }

  return {
    success: true,
    message:
      'Account created successfully! Please check your email to verify your account.',
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

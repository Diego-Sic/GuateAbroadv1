'use server';

import { createClient } from '@/lib/supabase/server';
import {
  registerSchema,
  loginSchema,
  type RegisterFormData,
  type LoginFormData,
} from '@/lib/validations/auth';
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

export async function signIn(data: LoginFormData): Promise<AuthActionResult> {
  // Validate input
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0]?.message || 'Invalid input',
    };
  }

  const { email, password } = validatedFields.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Handle specific errors
    if (error.message.includes('Invalid login credentials')) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }
    if (error.message.includes('Email not confirmed')) {
      return {
        success: false,
        error: 'Please verify your email before signing in',
      };
    }
    return {
      success: false,
      error: error.message,
    };
  }

  // Update last_login timestamp
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);
  }

  return {
    success: true,
    message: 'Signed in successfully',
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

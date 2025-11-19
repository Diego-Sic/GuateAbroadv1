'use server';

import { createClient } from '@/lib/supabase/server';
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from '@/lib/validations/profile';
import { revalidatePath } from 'next/cache';

export type ProfileActionResult = {
  success: boolean;
  error?: string;
  message?: string;
  data?: unknown;
};

export async function updateProfile(
  data: UpdateProfileFormData
): Promise<ProfileActionResult> {
  const validatedFields = updateProfileSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0]?.message || 'Invalid input',
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'You must be logged in to update your profile',
    };
  }

  // Check if username is taken by another user
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('username', validatedFields.data.username)
    .neq('id', user.id)
    .single();

  if (existingUser) {
    return {
      success: false,
      error: 'Username is already taken',
    };
  }

  // Update profile
  const { error } = await supabase
    .from('users')
    .update({
      username: validatedFields.data.username,
      full_name: validatedFields.data.full_name || null,
      bio: validatedFields.data.bio || null,
      location: validatedFields.data.location || null,
      education_level: validatedFields.data.education_level || null,
      field_of_interest: validatedFields.data.field_of_interest || null,
    })
    .eq('id', user.id);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath('/profile');

  return {
    success: true,
    message: 'Profile updated successfully',
  };
}

export async function uploadProfileImage(
  formData: FormData
): Promise<ProfileActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'You must be logged in to upload an image',
    };
  }

  const file = formData.get('file') as File;

  if (!file) {
    return {
      success: false,
      error: 'No file provided',
    };
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error:
        'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.',
    };
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      success: false,
      error: 'File too large. Maximum size is 5MB.',
    };
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('profiles')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    return {
      success: false,
      error: uploadError.message,
    };
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('profiles').getPublicUrl(filePath);

  // Update user profile with new image URL
  const { error: updateError } = await supabase
    .from('users')
    .update({ profile_image_url: publicUrl })
    .eq('id', user.id);

  if (updateError) {
    return {
      success: false,
      error: updateError.message,
    };
  }

  revalidatePath('/profile');

  return {
    success: true,
    message: 'Profile image updated successfully',
    data: { url: publicUrl },
  };
}

export async function deleteProfileImage(): Promise<ProfileActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'You must be logged in',
    };
  }

  // Get current profile to find the image URL
  const { data: profile } = await supabase
    .from('users')
    .select('profile_image_url')
    .eq('id', user.id)
    .single();

  if (profile?.profile_image_url) {
    // Extract file path from URL
    const urlParts = profile.profile_image_url.split('/');
    const filePath = `avatars/${urlParts[urlParts.length - 1]}`;

    // Delete from storage
    await supabase.storage.from('profiles').remove([filePath]);
  }

  // Update profile to remove image URL
  const { error } = await supabase
    .from('users')
    .update({ profile_image_url: null })
    .eq('id', user.id);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath('/profile');

  return {
    success: true,
    message: 'Profile image removed',
  };
}

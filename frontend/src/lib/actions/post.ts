'use server';

import { createClient } from '@/lib/supabase/server';
import {
  createPostSchema,
  type CreatePostFormData,
} from '@/lib/validations/post';

export type PostActionResult = {
  success: boolean;
  error?: string;
  message?: string;
  postId?: string;
};

export async function createPost(
  data: CreatePostFormData
): Promise<PostActionResult> {
  // Validate input
  const validatedFields = createPostSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0]?.message || 'Invalid input',
    };
  }

  const { title, content, category } = validatedFields.data;

  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'You must be logged in to create a post',
    };
  }

  // Save to database
  const { data: post, error } = await supabase
    .from('forum_posts')
    .insert({
      title,
      content,
      category,
      author_id: user.id,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return {
      success: false,
      error: 'Failed to create post. Please try again.',
    };
  }

  return {
    success: true,
    message: 'Post created successfully!',
    postId: post.id,
  };
}

'use server';

import { createClient } from '@/lib/supabase/server';
import {
  createReplySchema,
  type CreateReplyFormData,
} from '@/lib/validations/reply';

export type ReplyActionResult = {
  success: boolean;
  error?: string;
  message?: string;
  replyId?: string;
};

export async function createReply(
  data: CreateReplyFormData
): Promise<ReplyActionResult> {
  // Validate input
  const validatedFields = createReplySchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0]?.message || 'Invalid input',
    };
  }

  const { content, postId, parentReplyId } = validatedFields.data;

  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'You must be logged in to reply',
    };
  }

  // Save to database
  const { data: reply, error } = await supabase
    .from('forum_replies')
    .insert({
      content,
      post_id: postId,
      parent_reply_id: parentReplyId || null,
      author_id: user.id,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating reply:', error);
    return {
      success: false,
      error: 'Failed to post reply. Please try again.',
    };
  }

  return {
    success: true,
    message: 'Reply posted successfully!',
    replyId: reply.id,
  };
}

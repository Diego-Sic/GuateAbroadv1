import { createClient } from '@/lib/supabase/server';

export interface PostWithAuthor {
  id: string;
  title: string;
  content: string;
  category: string;
  author_id: string;
  is_pinned: boolean;
  view_count: number;
  reply_count: number;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

export interface ReplyWithAuthor {
  id: string;
  content: string;
  post_id: string;
  author_id: string;
  parent_reply_id: string | null;
  created_at: string;
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

const categoryColors: Record<string, string> = {
  scholarships: 'bg-blue-500',
  visa: 'bg-green-500',
  tests: 'bg-purple-500',
  university: 'bg-orange-500',
  general: 'bg-gray-500',
};

const categoryLabels: Record<string, string> = {
  scholarships: 'Scholarships',
  visa: 'Visa',
  tests: 'Tests',
  university: 'University',
  general: 'General',
};

export async function getPosts(options?: {
  category?: string;
  sortBy?: 'newest' | 'popular';
  limit?: number;
}) {
  const supabase = await createClient();

  let query = supabase
    .from('forum_posts')
    .select(`
      *,
      author:users!author_id (
        id,
        username,
        avatar_url
      )
    `);

  // Filter by category
  if (options?.category && options.category !== 'all') {
    query = query.eq('category', options.category);
  }

  // Sort
  if (options?.sortBy === 'popular') {
    query = query.order('is_pinned', { ascending: false })
      .order('view_count', { ascending: false });
  } else {
    query = query.order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
  }

  // Limit
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  // Transform to match the expected format
  return (data as PostWithAuthor[]).map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    category: {
      id: post.category,
      label: categoryLabels[post.category] || post.category,
      color: categoryColors[post.category] || 'bg-gray-500',
    },
    author: {
      id: post.author.id,
      username: post.author.username,
      avatarUrl: post.author.avatar_url,
    },
    replies: post.reply_count,
    views: post.view_count,
    createdAt: formatRelativeTime(post.created_at),
    isPinned: post.is_pinned,
  }));
}

export async function getPostById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('forum_posts')
    .select(`
      *,
      author:users!author_id (
        id,
        username,
        avatar_url
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  const post = data as PostWithAuthor;

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    category: {
      id: post.category,
      label: categoryLabels[post.category] || post.category,
      color: categoryColors[post.category] || 'bg-gray-500',
    },
    author: {
      id: post.author.id,
      username: post.author.username,
      avatarUrl: post.author.avatar_url,
    },
    replies: post.reply_count,
    views: post.view_count,
    createdAt: post.created_at,
    isPinned: post.is_pinned,
  };
}

export async function getRepliesByPostId(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('forum_replies')
    .select(`
      *,
      author:users!author_id (
        id,
        username,
        avatar_url
      )
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching replies:', error);
    return [];
  }

  return (data as ReplyWithAuthor[]).map((reply) => ({
    id: reply.id,
    content: reply.content,
    author: {
      id: reply.author.id,
      username: reply.author.username,
      avatarUrl: reply.author.avatar_url,
    },
    createdAt: reply.created_at,
    parentReplyId: reply.parent_reply_id,
  }));
}

export async function incrementViewCount(postId: string) {
  const supabase = await createClient();

  await supabase.rpc('increment_view_count', { post_id: postId }).catch(() => {
    // Fallback: direct update if RPC doesn't exist
    supabase
      .from('forum_posts')
      .update({ view_count: supabase.rpc('increment', { x: 1 }) })
      .eq('id', postId);
  });
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

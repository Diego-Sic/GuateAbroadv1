import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PostDetail } from '@/components/forum/post-detail';
import { getUser } from '@/lib/auth/get-user';
import { getPostById, getRepliesByPostId } from '@/lib/db/posts';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return {
      title: 'Post Not Found - GuateAbroad',
    };
  }

  return {
    title: `${post.title} - GuateAbroad`,
    description: post.content.substring(0, 160),
  };
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, replies, currentUser] = await Promise.all([
    getPostById(id),
    getRepliesByPostId(id),
    getUser(),
  ]);

  if (!post) {
    notFound();
  }

  // Check if current user is the author
  const isAuthor = currentUser?.id === post.author.id;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <PostDetail
            post={post}
            isAuthor={isAuthor}
            replies={replies}
            currentUserId={currentUser?.id}
            isAuthenticated={!!currentUser}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

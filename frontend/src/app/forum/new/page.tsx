import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth/get-user';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CreatePostForm } from '@/components/forum/create-post-form';

export const metadata = {
  title: 'Create New Post - GuateAbroad',
  description: 'Share your question or experience with the GuateAbroad community',
};

export default async function NewPostPage() {
  // Check if user is authenticated
  const user = await getUser();

  if (!user) {
    redirect('/auth/login?next=/forum/new');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <CreatePostForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

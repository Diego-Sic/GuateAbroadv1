import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ForumLayout } from '@/components/forum/forum-layout';

export const metadata = {
  title: 'Community Forum - GuateAbroad',
  description: 'Connect with fellow Guatemalan students, share experiences, and get advice on scholarships, visas, and more.',
};

export default function ForumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <Suspense fallback={<ForumLoadingSkeleton />}>
          <ForumLayout />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function ForumLoadingSkeleton() {
  return (
    <div className="container py-8">
      <div className="mb-8 h-10 w-64 animate-pulse rounded-md bg-muted" />
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="hidden lg:block">
          <div className="h-64 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-md bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

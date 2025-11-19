'use client';

import { useState } from 'react';
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PostCard, type PostCardProps } from './post-card';
import { PostListSkeleton } from './post-list-skeleton';

interface PostListProps {
  posts: PostCardProps[];
  isLoading?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  emptyDescription?: string;
}

export function PostList({
  posts,
  isLoading = false,
  pageSize = 10,
  emptyMessage = 'No posts found',
  emptyDescription = 'Be the first to start a discussion!',
}: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <PostListSkeleton count={pageSize} />;
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">{emptyMessage}</h3>
          <p className="text-muted-foreground">{emptyDescription}</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPosts = posts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4">
      {/* Posts */}
      {currentPosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first, last, current, and adjacent pages
              const showPage =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;

              if (!showPage) {
                // Show ellipsis for gaps
                if (page === 2 || page === totalPages - 1) {
                  return (
                    <span key={page} className="px-2 text-muted-foreground">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'ghost'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

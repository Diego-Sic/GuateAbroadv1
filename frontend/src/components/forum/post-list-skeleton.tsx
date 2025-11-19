import { Card, CardContent } from '@/components/ui/card';

interface PostListSkeletonProps {
  count?: number;
}

export function PostListSkeleton({ count = 5 }: PostListSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Avatar skeleton */}
              <div className="hidden h-10 w-10 animate-pulse rounded-full bg-muted sm:block" />

              {/* Content skeleton */}
              <div className="flex-1 space-y-3">
                {/* Badges */}
                <div className="flex gap-2">
                  <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
                  <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
                </div>

                {/* Title */}
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

                {/* Meta */}
                <div className="flex gap-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </div>
              </div>

              {/* Stats skeleton */}
              <div className="hidden flex-col items-end gap-2 sm:flex">
                <div className="h-4 w-12 animate-pulse rounded bg-muted" />
                <div className="h-4 w-12 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

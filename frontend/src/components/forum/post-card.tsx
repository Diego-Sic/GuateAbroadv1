import Link from 'next/link';
import { Pin, MessageSquare, Eye } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface PostCardProps {
  id: string;
  title: string;
  category: {
    id: string;
    label: string;
    color: string;
  };
  author: {
    username: string;
    avatarUrl?: string | null;
  };
  replies: number;
  views: number;
  createdAt: string;
  isPinned?: boolean;
  excerpt?: string;
}

export function PostCard({
  id,
  title,
  category,
  author,
  replies,
  views,
  createdAt,
  isPinned = false,
  excerpt,
}: PostCardProps) {
  const authorInitials = author.username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Author Avatar */}
          <Avatar className="hidden h-10 w-10 sm:flex">
            <AvatarImage src={author.avatarUrl || undefined} alt={author.username} />
            <AvatarFallback>{authorInitials}</AvatarFallback>
          </Avatar>

          {/* Post Content */}
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {isPinned && (
                <Badge variant="secondary" className="text-xs">
                  <Pin className="mr-1 h-3 w-3" />
                  Pinned
                </Badge>
              )}
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: category.color.replace('bg-', ''),
                }}
              >
                {category.label}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="mb-1 font-semibold leading-tight hover:text-primary">
              <Link href={`/forum/post/${id}`} className="line-clamp-2">
                {title}
              </Link>
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
                {excerpt}
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{author.username}</span>
              <span>{createdAt}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden flex-col items-end gap-1 text-sm text-muted-foreground sm:flex">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{replies}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{views}</span>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground sm:hidden">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            <span>{replies} replies</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{views} views</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

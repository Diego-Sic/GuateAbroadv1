'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Eye,
  MessageSquare,
  Pencil,
  Trash2,
  Share2,
  Flag,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface PostDetailProps {
  post: {
    id: string;
    title: string;
    content: string;
    category: {
      id: string;
      label: string;
      color: string;
    };
    author: {
      id: string;
      username: string;
      avatarUrl?: string | null;
    };
    replies: number;
    views: number;
    createdAt: string;
    isPinned?: boolean;
  };
  isAuthor: boolean;
}

export function PostDetail({ post, isAuthor }: PostDetailProps) {
  // Increment view count on load (placeholder - would call API)
  useEffect(() => {
    // In production, this would call an API to increment views
    console.log('View counted for post:', post.id);
  }, [post.id]);

  const authorInitials = post.author.username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleDelete = () => {
    // Placeholder - would call API to delete
    toast.success('Post deleted (demo mode)');
  };

  const handleReport = () => {
    toast.success(
      'Post reported. Thank you for helping keep our community safe.'
    );
  };

  // Simple markdown-like rendering (basic implementation)
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="mt-6 mb-3 text-lg font-semibold">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="mt-8 mb-4 text-xl font-bold">
            {line.replace('## ', '')}
          </h2>
        );
      }
      // Bold text
      let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic text
      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      // List items
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 list-disc">
            <span
              dangerouslySetInnerHTML={{
                __html: processedLine.replace('- ', ''),
              }}
            />
          </li>
        );
      }
      // Numbered list items
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={index} className="ml-4 list-decimal">
            <span
              dangerouslySetInnerHTML={{
                __html: processedLine.replace(/^\d+\.\s/, ''),
              }}
            />
          </li>
        );
      }
      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      // Regular paragraphs
      return (
        <p key={index} className="mb-2">
          <span dangerouslySetInnerHTML={{ __html: processedLine }} />
        </p>
      );
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/forum">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Link>
        </Button>
      </div>

      {/* Main post card */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          {/* Category and metadata */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {post.isPinned && <Badge variant="secondary">Pinned</Badge>}
            <Badge
              variant="outline"
              style={{
                borderColor: post.category.color.replace('bg-', ''),
              }}
            >
              {post.category.label}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
            {post.title}
          </h1>

          {/* Author and metadata */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatarUrl || undefined} />
                <AvatarFallback>{authorInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.username}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.views} views
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {post.replies} replies
              </span>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Content */}
          <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
            {renderContent(post.content)}
          </div>

          <Separator className="my-6" />

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              {!isAuthor && (
                <Button variant="ghost" size="sm" onClick={handleReport}>
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </Button>
              )}
            </div>

            {isAuthor && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/forum/post/${post.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post and all its replies.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Replies section placeholder */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Replies ({post.replies})
          </h2>
          <p className="text-muted-foreground">
            Reply functionality will be implemented in TICKET-020.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

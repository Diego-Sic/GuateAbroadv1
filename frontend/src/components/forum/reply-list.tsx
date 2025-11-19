'use client';

import { useState } from 'react';
import { MessageSquare, Reply, MoreHorizontal, Flag, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReplyForm } from './reply-form';
import { toast } from 'sonner';

export interface ReplyData {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatarUrl?: string | null;
  };
  createdAt: string;
  parentReplyId?: string | null;
  replies?: ReplyData[];
}

interface ReplyListProps {
  postId: string;
  replies: ReplyData[];
  currentUserId?: string;
  isAuthenticated: boolean;
}

export function ReplyList({
  postId,
  replies,
  currentUserId,
  isAuthenticated,
}: ReplyListProps) {
  // Organize replies into threads
  const topLevelReplies = replies.filter((r) => !r.parentReplyId);
  const nestedReplies = replies.filter((r) => r.parentReplyId);

  // Group nested replies by parent
  const repliesByParent = nestedReplies.reduce(
    (acc, reply) => {
      const parentId = reply.parentReplyId!;
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(reply);
      return acc;
    },
    {} as Record<string, ReplyData[]>
  );

  return (
    <div className="space-y-4">
      {topLevelReplies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          postId={postId}
          nestedReplies={repliesByParent[reply.id] || []}
          currentUserId={currentUserId}
          isAuthenticated={isAuthenticated}
        />
      ))}

      {replies.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          <MessageSquare className="mx-auto mb-2 h-8 w-8" />
          <p>No replies yet. Be the first to reply!</p>
        </div>
      )}
    </div>
  );
}

interface ReplyItemProps {
  reply: ReplyData;
  postId: string;
  nestedReplies: ReplyData[];
  currentUserId?: string;
  isAuthenticated: boolean;
  isNested?: boolean;
}

function ReplyItem({
  reply,
  postId,
  nestedReplies,
  currentUserId,
  isAuthenticated,
  isNested = false,
}: ReplyItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const isAuthor = currentUserId === reply.author.id;

  const authorInitials = reply.author.username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const formattedDate = new Date(reply.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDelete = () => {
    toast.success('Reply deleted (demo mode)');
  };

  const handleReport = () => {
    toast.success('Reply reported. Thank you!');
  };

  return (
    <div className={isNested ? 'ml-8 border-l-2 border-muted pl-4' : ''}>
      <Card className="bg-background">
        <CardContent className="p-4">
          {/* Author info */}
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={reply.author.avatarUrl || undefined} />
                <AvatarFallback className="text-xs">{authorInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{reply.author.username}</p>
                <p className="text-xs text-muted-foreground">{formattedDate}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAuthor ? (
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={handleReport}>
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <div className="mb-3 text-sm whitespace-pre-wrap">{reply.content}</div>

          {/* Actions */}
          {isAuthenticated && !isNested && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <Reply className="mr-1 h-3 w-3" />
                Reply
              </Button>
            </div>
          )}

          {/* Reply form */}
          {showReplyForm && (
            <div className="mt-4">
              <ReplyForm
                postId={postId}
                parentReplyId={reply.id}
                onSuccess={() => setShowReplyForm(false)}
                onCancel={() => setShowReplyForm(false)}
                placeholder={`Reply to ${reply.author.username}...`}
                autoFocus
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nested replies */}
      {nestedReplies.length > 0 && (
        <div className="mt-2 space-y-2">
          {nestedReplies.map((nestedReply) => (
            <ReplyItem
              key={nestedReply.id}
              reply={nestedReply}
              postId={postId}
              nestedReplies={[]}
              currentUserId={currentUserId}
              isAuthenticated={isAuthenticated}
              isNested
            />
          ))}
        </div>
      )}
    </div>
  );
}

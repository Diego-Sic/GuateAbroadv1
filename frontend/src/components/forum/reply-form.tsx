'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  createReplySchema,
  type CreateReplyFormData,
} from '@/lib/validations/reply';
import { createReply } from '@/lib/actions/reply';
import { toast } from 'sonner';

interface ReplyFormProps {
  postId: string;
  parentReplyId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function ReplyForm({
  postId,
  parentReplyId,
  onSuccess,
  onCancel,
  placeholder = 'Write your reply...',
  autoFocus = false,
}: ReplyFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateReplyFormData>({
    resolver: zodResolver(createReplySchema),
    defaultValues: {
      content: '',
      postId,
      parentReplyId,
    },
  });

  async function onSubmit(data: CreateReplyFormData) {
    setIsLoading(true);

    try {
      const result = await createReply(data);

      if (result.success) {
        toast.success('Reply posted!', {
          description: result.message,
        });
        form.reset();
        onSuccess?.();
      } else {
        toast.error('Failed to post reply', {
          description: result.error,
        });
      }
    } catch {
      toast.error('Something went wrong', {
        description: 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  className="min-h-[100px] resize-y"
                  disabled={isLoading}
                  autoFocus={autoFocus}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" size="sm" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {parentReplyId ? 'Reply' : 'Post Reply'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

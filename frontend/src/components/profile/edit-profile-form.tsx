'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Camera, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from '@/lib/validations/profile';
import {
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
} from '@/lib/actions/profile';
import { toast } from 'sonner';
import type { User } from '@/types/database';

interface EditProfileFormProps {
  user: User;
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState(user.profile_image_url);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user.username,
      full_name: user.full_name || '',
      bio: user.bio || '',
      location: user.location || '',
      education_level: user.education_level,
      field_of_interest: user.field_of_interest || '',
    },
  });

  async function onSubmit(data: UpdateProfileFormData) {
    setIsLoading(true);

    try {
      const result = await updateProfile(data);

      if (result.success) {
        toast.success('Profile updated!', {
          description: result.message,
        });
      } else {
        toast.error('Update failed', {
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadProfileImage(formData);

      if (result.success) {
        setProfileImage((result.data as { url: string })?.url || profileImage);
        toast.success('Image uploaded!', {
          description: result.message,
        });
      } else {
        toast.error('Upload failed', {
          description: result.error,
        });
      }
    } catch {
      toast.error('Something went wrong', {
        description: 'Please try again later',
      });
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  async function handleDeleteImage() {
    setIsUploadingImage(true);

    try {
      const result = await deleteProfileImage();

      if (result.success) {
        setProfileImage(null);
        toast.success('Image removed', {
          description: result.message,
        });
      } else {
        toast.error('Failed to remove image', {
          description: result.error,
        });
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsUploadingImage(false);
    }
  }

  const initials = user.full_name
    ? user.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.username.slice(0, 2).toUpperCase();

  return (
    <div className="space-y-8">
      {/* Profile Image Section */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileImage || undefined} alt={user.username} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          {isUploadingImage && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingImage}
            >
              <Camera className="mr-2 h-4 w-4" />
              Change
            </Button>
            {profileImage && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDeleteImage}
                disabled={isUploadingImage}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            JPG, PNG, WebP or GIF. Max 5MB.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Profile Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little about yourself..."
                    className="resize-none"
                    rows={4}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Max 500 characters. {field.value?.length || 0}/500
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Guatemala City, Guatemala"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="education_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || undefined}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="field_of_interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Interest</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Computer Science, Engineering, etc."
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}

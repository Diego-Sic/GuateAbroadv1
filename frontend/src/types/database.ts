// Database types for GuateAbroad
// These types match the schema defined in backend/supabase/migrations/000_schema.sql
//
// To regenerate from Supabase:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Enum types
export type ForumCategory = 'scholarships' | 'visa' | 'tests' | 'university' | 'general';
export type EducationLevel = 'high_school' | 'undergraduate' | 'graduate' | 'postgraduate' | 'other';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          full_name: string | null;
          profile_image_url: string | null;
          bio: string | null;
          location: string | null;
          education_level: EducationLevel | null;
          field_of_interest: string | null;
          reputation_score: number;
          is_moderator: boolean;
          is_admin: boolean;
          email_verified: boolean;
          created_at: string;
          updated_at: string;
          last_login: string | null;
        };
        Insert: {
          id: string;
          email: string;
          username: string;
          full_name?: string | null;
          profile_image_url?: string | null;
          bio?: string | null;
          location?: string | null;
          education_level?: EducationLevel | null;
          field_of_interest?: string | null;
          reputation_score?: number;
          is_moderator?: boolean;
          is_admin?: boolean;
          email_verified?: boolean;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string;
          full_name?: string | null;
          profile_image_url?: string | null;
          bio?: string | null;
          location?: string | null;
          education_level?: EducationLevel | null;
          field_of_interest?: string | null;
          reputation_score?: number;
          is_moderator?: boolean;
          is_admin?: boolean;
          email_verified?: boolean;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
      };
      forum_posts: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          category: ForumCategory;
          view_count: number;
          reply_count: number;
          upvotes: number;
          downvotes: number;
          is_pinned: boolean;
          is_locked: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          category?: ForumCategory;
          view_count?: number;
          reply_count?: number;
          upvotes?: number;
          downvotes?: number;
          is_pinned?: boolean;
          is_locked?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          category?: ForumCategory;
          view_count?: number;
          reply_count?: number;
          upvotes?: number;
          downvotes?: number;
          is_pinned?: boolean;
          is_locked?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      forum_replies: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          parent_reply_id: string | null;
          content: string;
          upvotes: number;
          downvotes: number;
          is_accepted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          parent_reply_id?: string | null;
          content: string;
          upvotes?: number;
          downvotes?: number;
          is_accepted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          parent_reply_id?: string | null;
          content?: string;
          upvotes?: number;
          downvotes?: number;
          is_accepted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      forum_votes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string | null;
          reply_id: string | null;
          vote_type: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id?: string | null;
          reply_id?: string | null;
          vote_type: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_id?: string | null;
          reply_id?: string | null;
          vote_type?: number;
          created_at?: string;
        };
      };
      milestones: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          order_index: number;
          icon: string | null;
          estimated_duration: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          order_index: number;
          icon?: string | null;
          estimated_duration?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          order_index?: number;
          icon?: string | null;
          estimated_duration?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      milestone_tasks: {
        Row: {
          id: string;
          milestone_id: string;
          title: string;
          description: string | null;
          resource_url: string | null;
          resource_title: string | null;
          order_index: number;
          is_required: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          milestone_id: string;
          title: string;
          description?: string | null;
          resource_url?: string | null;
          resource_title?: string | null;
          order_index: number;
          is_required?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          milestone_id?: string;
          title?: string;
          description?: string | null;
          resource_url?: string | null;
          resource_title?: string | null;
          order_index?: number;
          is_required?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          milestone_id: string;
          completed_tasks: number;
          total_tasks: number;
          is_completed: boolean;
          started_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          milestone_id: string;
          completed_tasks?: number;
          total_tasks?: number;
          is_completed?: boolean;
          started_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          milestone_id?: string;
          completed_tasks?: number;
          total_tasks?: number;
          is_completed?: boolean;
          started_at?: string;
          completed_at?: string | null;
        };
      };
      user_task_progress: {
        Row: {
          id: string;
          user_id: string;
          task_id: string;
          is_completed: boolean;
          notes: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          task_id: string;
          is_completed?: boolean;
          notes?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          task_id?: string;
          is_completed?: boolean;
          notes?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          is_active?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      forum_category: ForumCategory;
      education_level: EducationLevel;
    };
  };
}

// Convenience types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Specific table types
export type User = Tables<'users'>;
export type ForumPost = Tables<'forum_posts'>;
export type ForumReply = Tables<'forum_replies'>;
export type ForumVote = Tables<'forum_votes'>;
export type Milestone = Tables<'milestones'>;
export type MilestoneTask = Tables<'milestone_tasks'>;
export type UserProgress = Tables<'user_progress'>;
export type UserTaskProgress = Tables<'user_task_progress'>;
export type NewsletterSubscriber = Tables<'newsletter_subscribers'>;

// Insert types
export type InsertUser = InsertTables<'users'>;
export type InsertForumPost = InsertTables<'forum_posts'>;
export type InsertForumReply = InsertTables<'forum_replies'>;
export type InsertForumVote = InsertTables<'forum_votes'>;
export type InsertMilestone = InsertTables<'milestones'>;
export type InsertMilestoneTask = InsertTables<'milestone_tasks'>;
export type InsertUserProgress = InsertTables<'user_progress'>;
export type InsertUserTaskProgress = InsertTables<'user_task_progress'>;
export type InsertNewsletterSubscriber = InsertTables<'newsletter_subscribers'>;

// Update types
export type UpdateUser = UpdateTables<'users'>;
export type UpdateForumPost = UpdateTables<'forum_posts'>;
export type UpdateForumReply = UpdateTables<'forum_replies'>;
export type UpdateForumVote = UpdateTables<'forum_votes'>;
export type UpdateMilestone = UpdateTables<'milestones'>;
export type UpdateMilestoneTask = UpdateTables<'milestone_tasks'>;
export type UpdateUserProgress = UpdateTables<'user_progress'>;
export type UpdateUserTaskProgress = UpdateTables<'user_task_progress'>;
export type UpdateNewsletterSubscriber = UpdateTables<'newsletter_subscribers'>;

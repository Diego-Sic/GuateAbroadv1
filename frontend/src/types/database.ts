// Database types will be generated from Supabase
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
// Or use the Supabase dashboard to generate types

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Placeholder types - will be replaced with generated types
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
          education_level: string | null;
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
          id?: string;
          email: string;
          username: string;
          full_name?: string | null;
          profile_image_url?: string | null;
          bio?: string | null;
          location?: string | null;
          education_level?: string | null;
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
          education_level?: string | null;
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
      // Add more tables as they are created
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

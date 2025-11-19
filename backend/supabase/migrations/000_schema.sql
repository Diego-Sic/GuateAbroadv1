-- GuateAbroad Database Schema
-- Migration: 000_schema.sql
-- Description: Core tables for the GuateAbroad MVP

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Forum post categories
CREATE TYPE forum_category AS ENUM (
  'scholarships',
  'visa',
  'tests',
  'university',
  'general'
);

-- Education level options
CREATE TYPE education_level AS ENUM (
  'high_school',
  'undergraduate',
  'graduate',
  'postgraduate',
  'other'
);

-- ============================================================================
-- USERS TABLE
-- ============================================================================

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  profile_image_url TEXT,
  bio TEXT,
  location TEXT,
  education_level education_level,
  field_of_interest TEXT,
  reputation_score INTEGER DEFAULT 0,
  is_moderator BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,

  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$')
);

-- Indexes for users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- ============================================================================
-- FORUM POSTS TABLE
-- ============================================================================

CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category forum_category NOT NULL DEFAULT 'general',
  view_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT title_length CHECK (char_length(title) >= 5 AND char_length(title) <= 200),
  CONSTRAINT content_length CHECK (char_length(content) >= 10)
);

-- Indexes for forum_posts
CREATE INDEX idx_forum_posts_user_id ON forum_posts(user_id);
CREATE INDEX idx_forum_posts_category ON forum_posts(category);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at DESC);
CREATE INDEX idx_forum_posts_upvotes ON forum_posts(upvotes DESC);

-- ============================================================================
-- FORUM REPLIES TABLE
-- ============================================================================

CREATE TABLE forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  is_accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT reply_content_length CHECK (char_length(content) >= 2)
);

-- Indexes for forum_replies
CREATE INDEX idx_forum_replies_post_id ON forum_replies(post_id);
CREATE INDEX idx_forum_replies_user_id ON forum_replies(user_id);
CREATE INDEX idx_forum_replies_parent_id ON forum_replies(parent_reply_id);
CREATE INDEX idx_forum_replies_created_at ON forum_replies(created_at DESC);

-- ============================================================================
-- FORUM VOTES TABLE (for tracking user votes)
-- ============================================================================

CREATE TABLE forum_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE,
  vote_type SMALLINT NOT NULL CHECK (vote_type IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure vote is for either post or reply, not both
  CONSTRAINT vote_target CHECK (
    (post_id IS NOT NULL AND reply_id IS NULL) OR
    (post_id IS NULL AND reply_id IS NOT NULL)
  ),
  -- One vote per user per post/reply
  CONSTRAINT unique_post_vote UNIQUE (user_id, post_id),
  CONSTRAINT unique_reply_vote UNIQUE (user_id, reply_id)
);

-- Indexes for forum_votes
CREATE INDEX idx_forum_votes_user_id ON forum_votes(user_id);
CREATE INDEX idx_forum_votes_post_id ON forum_votes(post_id);
CREATE INDEX idx_forum_votes_reply_id ON forum_votes(reply_id);

-- ============================================================================
-- MILESTONES TABLE
-- ============================================================================

CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  icon TEXT,
  estimated_duration TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_milestone_order UNIQUE (order_index)
);

-- Index for milestones
CREATE INDEX idx_milestones_order ON milestones(order_index);

-- ============================================================================
-- MILESTONE TASKS TABLE
-- ============================================================================

CREATE TABLE milestone_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  resource_url TEXT,
  resource_title TEXT,
  order_index INTEGER NOT NULL,
  is_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_task_order UNIQUE (milestone_id, order_index)
);

-- Indexes for milestone_tasks
CREATE INDEX idx_milestone_tasks_milestone_id ON milestone_tasks(milestone_id);
CREATE INDEX idx_milestone_tasks_order ON milestone_tasks(milestone_id, order_index);

-- ============================================================================
-- USER PROGRESS TABLE (overall milestone progress)
-- ============================================================================

CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
  completed_tasks INTEGER DEFAULT 0,
  total_tasks INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  CONSTRAINT unique_user_milestone UNIQUE (user_id, milestone_id)
);

-- Indexes for user_progress
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_milestone_id ON user_progress(milestone_id);

-- ============================================================================
-- USER TASK PROGRESS TABLE (individual task completion)
-- ============================================================================

CREATE TABLE user_task_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES milestone_tasks(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_user_task UNIQUE (user_id, task_id)
);

-- Indexes for user_task_progress
CREATE INDEX idx_user_task_progress_user_id ON user_task_progress(user_id);
CREATE INDEX idx_user_task_progress_task_id ON user_task_progress(task_id);
CREATE INDEX idx_user_task_progress_completed ON user_task_progress(user_id, is_completed);

-- ============================================================================
-- NEWSLETTER SUBSCRIBERS TABLE (for landing page)
-- ============================================================================

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Index for newsletter
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update reply count on forum posts
CREATE OR REPLACE FUNCTION update_post_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_posts
    SET reply_count = reply_count + 1
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_posts
    SET reply_count = reply_count - 1
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update vote counts
CREATE OR REPLACE FUNCTION update_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.post_id IS NOT NULL THEN
      IF NEW.vote_type = 1 THEN
        UPDATE forum_posts SET upvotes = upvotes + 1 WHERE id = NEW.post_id;
      ELSE
        UPDATE forum_posts SET downvotes = downvotes + 1 WHERE id = NEW.post_id;
      END IF;
    ELSIF NEW.reply_id IS NOT NULL THEN
      IF NEW.vote_type = 1 THEN
        UPDATE forum_replies SET upvotes = upvotes + 1 WHERE id = NEW.reply_id;
      ELSE
        UPDATE forum_replies SET downvotes = downvotes + 1 WHERE id = NEW.reply_id;
      END IF;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.post_id IS NOT NULL THEN
      IF OLD.vote_type = 1 THEN
        UPDATE forum_posts SET upvotes = upvotes - 1 WHERE id = OLD.post_id;
      ELSE
        UPDATE forum_posts SET downvotes = downvotes - 1 WHERE id = OLD.post_id;
      END IF;
    ELSIF OLD.reply_id IS NOT NULL THEN
      IF OLD.vote_type = 1 THEN
        UPDATE forum_replies SET upvotes = upvotes - 1 WHERE id = OLD.reply_id;
      ELSE
        UPDATE forum_replies SET downvotes = downvotes - 1 WHERE id = OLD.reply_id;
      END IF;
    END IF;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle vote change
    IF OLD.vote_type != NEW.vote_type THEN
      IF NEW.post_id IS NOT NULL THEN
        IF NEW.vote_type = 1 THEN
          UPDATE forum_posts SET upvotes = upvotes + 1, downvotes = downvotes - 1 WHERE id = NEW.post_id;
        ELSE
          UPDATE forum_posts SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = NEW.post_id;
        END IF;
      ELSIF NEW.reply_id IS NOT NULL THEN
        IF NEW.vote_type = 1 THEN
          UPDATE forum_replies SET upvotes = upvotes + 1, downvotes = downvotes - 1 WHERE id = NEW.reply_id;
        ELSE
          UPDATE forum_replies SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = NEW.reply_id;
        END IF;
      END IF;
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update user progress when task is completed
CREATE OR REPLACE FUNCTION update_user_milestone_progress()
RETURNS TRIGGER AS $$
DECLARE
  v_milestone_id UUID;
  v_completed_count INTEGER;
  v_total_count INTEGER;
BEGIN
  -- Get the milestone_id for this task
  SELECT milestone_id INTO v_milestone_id
  FROM milestone_tasks
  WHERE id = NEW.task_id;

  -- Count completed tasks for this user and milestone
  SELECT COUNT(*) INTO v_completed_count
  FROM user_task_progress utp
  JOIN milestone_tasks mt ON mt.id = utp.task_id
  WHERE utp.user_id = NEW.user_id
    AND mt.milestone_id = v_milestone_id
    AND utp.is_completed = TRUE;

  -- Count total tasks for this milestone
  SELECT COUNT(*) INTO v_total_count
  FROM milestone_tasks
  WHERE milestone_id = v_milestone_id;

  -- Update or insert user progress
  INSERT INTO user_progress (user_id, milestone_id, completed_tasks, total_tasks, is_completed, completed_at)
  VALUES (
    NEW.user_id,
    v_milestone_id,
    v_completed_count,
    v_total_count,
    v_completed_count = v_total_count,
    CASE WHEN v_completed_count = v_total_count THEN NOW() ELSE NULL END
  )
  ON CONFLICT (user_id, milestone_id)
  DO UPDATE SET
    completed_tasks = v_completed_count,
    total_tasks = v_total_count,
    is_completed = v_completed_count = v_total_count,
    completed_at = CASE WHEN v_completed_count = v_total_count THEN NOW() ELSE NULL END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Updated_at triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at
  BEFORE UPDATE ON forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_replies_updated_at
  BEFORE UPDATE ON forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_milestones_updated_at
  BEFORE UPDATE ON milestones
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_milestone_tasks_updated_at
  BEFORE UPDATE ON milestone_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_task_progress_updated_at
  BEFORE UPDATE ON user_task_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Reply count trigger
CREATE TRIGGER update_reply_count
  AFTER INSERT OR DELETE ON forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION update_post_reply_count();

-- Vote count triggers
CREATE TRIGGER update_vote_counts_trigger
  AFTER INSERT OR UPDATE OR DELETE ON forum_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_vote_counts();

-- User progress trigger
CREATE TRIGGER update_milestone_progress
  AFTER INSERT OR UPDATE ON user_task_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_user_milestone_progress();

-- Row Level Security Policies for GuateAbroad
-- These policies should be applied after creating the tables

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestone_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_task_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Forum posts policies
CREATE POLICY "Anyone can view posts"
  ON forum_posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON forum_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON forum_posts FOR DELETE
  USING (auth.uid() = user_id);

-- Forum replies policies
CREATE POLICY "Anyone can view replies"
  ON forum_replies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create replies"
  ON forum_replies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own replies"
  ON forum_replies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own replies"
  ON forum_replies FOR DELETE
  USING (auth.uid() = user_id);

-- Milestones policies (public read, admin write)
CREATE POLICY "Anyone can view milestones"
  ON milestones FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage milestones"
  ON milestones FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Milestone tasks policies (public read, admin write)
CREATE POLICY "Anyone can view milestone tasks"
  ON milestone_tasks FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage milestone tasks"
  ON milestone_tasks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- User progress policies (own data only)
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- User task progress policies (own data only)
CREATE POLICY "Users can view own task progress"
  ON user_task_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own task progress"
  ON user_task_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own task progress"
  ON user_task_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Forum votes policies
CREATE POLICY "Anyone can view votes"
  ON forum_votes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create votes"
  ON forum_votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own votes"
  ON forum_votes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
  ON forum_votes FOR DELETE
  USING (auth.uid() = user_id);

-- Newsletter subscribers policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all subscribers"
  ON newsletter_subscribers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "Admins can manage subscribers"
  ON newsletter_subscribers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

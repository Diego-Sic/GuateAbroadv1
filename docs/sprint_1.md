# Sprint 1: MVP Development Plan

## Overview

This sprint focuses on building the Minimum Viable Product (MVP) for GuateAbroad - a platform to help Guatemalan students navigate US scholarship applications.

## Sprint Goals

- Set up project infrastructure and development environment
- Implement user authentication system
- Create responsive landing page
- Build basic forum with post/reply functionality
- Develop roadmap/progress tracker with milestones
- Deploy to production

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

---

## Tickets

### Epic 1: Project Setup & Infrastructure

#### TICKET-001: Initialize Next.js Project ✅

**Priority**: High
**Estimate**: 2 points
**Status**: COMPLETED

**Description**:
Set up the Next.js 14+ project with TypeScript and configure the basic project structure.

**Acceptance Criteria**:

- [x] Create Next.js 14+ project with App Router
- [x] Configure TypeScript
- [x] Set up folder structure (app, components, lib, types, utils)
- [x] Configure path aliases in tsconfig.json
- [x] Add .env.example file
- [x] Initialize git repository with .gitignore

---

#### TICKET-002: Configure Tailwind CSS and shadcn/ui ✅

**Priority**: High
**Estimate**: 2 points
**Status**: COMPLETED

**Description**:
Install and configure Tailwind CSS with shadcn/ui component library.

**Acceptance Criteria**:

- [x] Install and configure Tailwind CSS
- [x] Set up shadcn/ui with CLI
- [x] Configure custom color palette (brand colors)
- [x] Set up dark mode support
- [x] Install essential shadcn components (button, input, card, form, dialog, etc.)
- [x] Create global styles file

---

#### TICKET-003: Set Up Supabase Project ✅

**Priority**: High
**Estimate**: 3 points
**Status**: COMPLETED (pending user credentials)

**Description**:
Create Supabase project and configure database connection.

**Acceptance Criteria**:

- [ ] Create Supabase project (user action required)
- [x] Configure environment variables for Supabase connection
- [x] Set up Supabase client (browser and server)
- [x] Configure Row Level Security (RLS) policies structure
- [x] Test database connection
- [x] Document Supabase setup in README

---

#### TICKET-004: Create Database Schema - Core Tables

**Priority**: High
**Estimate**: 3 points

**Description**:
Create the core database tables needed for MVP functionality.

**Acceptance Criteria**:

- [ ] Create users table with all fields from schema
- [ ] Create forum_posts table
- [ ] Create forum_replies table
- [ ] Create milestones table
- [ ] Create milestone_tasks table
- [ ] Create user_progress table
- [ ] Create user_task_progress table
- [ ] Set up all indexes
- [ ] Configure foreign key relationships

---

#### TICKET-005: Set Up ESLint and Prettier

**Priority**: Medium
**Estimate**: 1 point

**Description**:
Configure code quality tools for consistent code style.

**Acceptance Criteria**:

- [ ] Install and configure ESLint
- [ ] Install and configure Prettier
- [ ] Add pre-commit hooks with Husky
- [ ] Create lint-staged configuration
- [ ] Document code style guidelines

---

### Epic 2: User Authentication

#### TICKET-006: Implement User Registration

**Priority**: High
**Estimate**: 3 points

**Description**:
Create user registration functionality with email and password.

**Acceptance Criteria**:

- [ ] Create registration form with React Hook Form + Zod
- [ ] Implement Supabase Auth signup
- [ ] Add email verification flow
- [ ] Create user profile record on signup
- [ ] Handle registration errors gracefully
- [ ] Add loading states
- [ ] Redirect to onboarding/dashboard after signup

---

#### TICKET-007: Implement User Login

**Priority**: High
**Estimate**: 2 points

**Description**:
Create user login functionality.

**Acceptance Criteria**:

- [ ] Create login form with validation
- [ ] Implement Supabase Auth signin
- [ ] Handle authentication errors
- [ ] Add "Remember me" functionality
- [ ] Redirect to dashboard after login
- [ ] Add loading states

---

#### TICKET-008: Implement Password Reset

**Priority**: Medium
**Estimate**: 2 points

**Description**:
Create password reset functionality.

**Acceptance Criteria**:

- [ ] Create forgot password form
- [ ] Implement password reset email flow
- [ ] Create reset password page
- [ ] Handle reset token validation
- [ ] Show success/error messages

---

#### TICKET-009: Create Auth Middleware and Protected Routes

**Priority**: High
**Estimate**: 2 points

**Description**:
Set up authentication middleware and route protection.

**Acceptance Criteria**:

- [ ] Create Next.js middleware for auth
- [ ] Protect dashboard and user routes
- [ ] Redirect unauthenticated users to login
- [ ] Create auth context/hook for client components
- [ ] Handle session refresh

---

#### TICKET-010: Create User Profile Page

**Priority**: Medium
**Estimate**: 3 points

**Description**:
Build user profile page with edit functionality.

**Acceptance Criteria**:

- [ ] Create profile page layout
- [ ] Display user information
- [ ] Create edit profile form
- [ ] Handle profile image upload to Supabase Storage
- [ ] Update user profile in database
- [ ] Add validation for all fields

---

### Epic 3: Landing Page

#### TICKET-011: Create Landing Page Layout ✅

**Priority**: High
**Estimate**: 3 points
**Status**: COMPLETED

**Description**:
Build the main landing page structure and hero section.

**Acceptance Criteria**:

- [x] Create responsive header with navigation
- [x] Build hero section with CTA buttons
- [x] Add platform purpose explanation
- [x] Implement mobile-responsive design
- [x] Create footer with links

---

#### TICKET-012: Add Statistics Section

**Priority**: Medium
**Estimate**: 2 points

**Description**:
Create statistics section showing platform impact.

**Acceptance Criteria**:

- [ ] Design statistics cards
- [ ] Add animated counters
- [ ] Display scholarships available
- [ ] Display students helped
- [ ] Make responsive for all screen sizes

---

#### TICKET-013: Create Features Overview Section

**Priority**: Medium
**Estimate**: 2 points

**Description**:
Build section showcasing platform features.

**Acceptance Criteria**:

- [ ] Design feature cards with icons
- [ ] Add descriptions for each feature
- [ ] Create responsive grid layout
- [ ] Link to respective feature pages

---

#### TICKET-014: Add Testimonials Section

**Priority**: Low
**Estimate**: 2 points

**Description**:
Create testimonials/success stories section.

**Acceptance Criteria**:

- [ ] Design testimonial cards
- [ ] Add placeholder testimonials
- [ ] Create carousel or grid layout
- [ ] Make responsive

---

#### TICKET-015: Implement Newsletter Signup

**Priority**: Low
**Estimate**: 2 points

**Description**:
Add newsletter signup form to landing page.

**Acceptance Criteria**:

- [ ] Create newsletter signup form
- [ ] Store emails in database
- [ ] Add validation
- [ ] Show success/error messages
- [ ] Prevent duplicate signups

---

### Epic 4: Forum System

#### TICKET-016: Create Forum Layout and Navigation

**Priority**: High
**Estimate**: 2 points

**Description**:
Build the main forum page layout with category navigation.

**Acceptance Criteria**:

- [ ] Create forum page layout
- [ ] Add category sidebar/tabs (Scholarships, Visa, Tests, General, University)
- [ ] Create responsive navigation
- [ ] Add search input placeholder
- [ ] Implement sorting options (newest, popular)

---

#### TICKET-017: Create Post List Component

**Priority**: High
**Estimate**: 3 points

**Description**:
Build component to display list of forum posts.

**Acceptance Criteria**:

- [ ] Create post card component
- [ ] Display post title, category, author, date
- [ ] Show reply count and view count
- [ ] Implement pagination or infinite scroll
- [ ] Add loading skeleton
- [ ] Handle empty state

---

#### TICKET-018: Implement Create Post Functionality

**Priority**: High
**Estimate**: 3 points

**Description**:
Build form and functionality to create new forum posts.

**Acceptance Criteria**:

- [ ] Create new post form with title, content, category
- [ ] Add rich text editor or markdown support
- [ ] Implement form validation
- [ ] Save post to database
- [ ] Redirect to post after creation
- [ ] Only allow authenticated users

---

#### TICKET-019: Create Post Detail Page

**Priority**: High
**Estimate**: 3 points

**Description**:
Build the individual post view page.

**Acceptance Criteria**:

- [ ] Display post title, content, author info
- [ ] Show post metadata (date, views, category)
- [ ] Increment view count on load
- [ ] Add edit/delete buttons for post author
- [ ] Create responsive layout

---

#### TICKET-020: Implement Reply System

**Priority**: High
**Estimate**: 3 points

**Description**:
Build reply functionality for forum posts.

**Acceptance Criteria**:

- [ ] Create reply form component
- [ ] Display replies in threaded view
- [ ] Support nested replies (one level)
- [ ] Save replies to database
- [ ] Update reply count on post
- [ ] Only allow authenticated users

---

#### TICKET-021: Implement Post Voting

**Priority**: Medium
**Estimate**: 2 points

**Description**:
Add upvote/downvote functionality to posts.

**Acceptance Criteria**:

- [ ] Create vote buttons component
- [ ] Implement voting logic
- [ ] Prevent duplicate votes
- [ ] Update vote count in real-time
- [ ] Store votes in database
- [ ] Update user reputation

---

#### TICKET-022: Create Forum API Routes

**Priority**: High
**Estimate**: 3 points

**Description**:
Build API routes for forum CRUD operations.

**Acceptance Criteria**:

- [ ] GET /api/forum/posts - List posts with filters
- [ ] GET /api/forum/posts/:id - Get single post
- [ ] POST /api/forum/posts - Create post
- [ ] PUT /api/forum/posts/:id - Update post
- [ ] DELETE /api/forum/posts/:id - Delete post
- [ ] POST/GET/DELETE for replies
- [ ] Add authentication checks
- [ ] Implement RLS policies

---

### Epic 5: Roadmap/Progress Tracker

#### TICKET-023: Seed Default Milestones and Tasks

**Priority**: High
**Estimate**: 2 points

**Description**:
Create seed data for default milestones and tasks.

**Acceptance Criteria**:

- [ ] Create 8 default milestones from spec
- [ ] Add 5-10 tasks per milestone
- [ ] Include resource links for tasks
- [ ] Create seed script
- [ ] Document milestone structure

---

#### TICKET-024: Create Roadmap Page Layout

**Priority**: High
**Estimate**: 3 points

**Description**:
Build the main roadmap page showing all milestones.

**Acceptance Criteria**:

- [ ] Create roadmap page layout
- [ ] Display milestones in timeline/list view
- [ ] Show progress percentage per milestone
- [ ] Calculate overall progress
- [ ] Create responsive design
- [ ] Add visual progress indicators

---

#### TICKET-025: Build Milestone Detail Component

**Priority**: High
**Estimate**: 3 points

**Description**:
Create component showing milestone tasks and details.

**Acceptance Criteria**:

- [ ] Display milestone title and description
- [ ] List all tasks with checkboxes
- [ ] Show task completion status
- [ ] Display resource links for each task
- [ ] Calculate milestone progress
- [ ] Create expandable/collapsible view

---

#### TICKET-026: Implement Task Completion Tracking

**Priority**: High
**Estimate**: 3 points

**Description**:
Build functionality to track task completion.

**Acceptance Criteria**:

- [ ] Toggle task completion state
- [ ] Save progress to user_task_progress table
- [ ] Update milestone progress
- [ ] Update overall progress
- [ ] Add completion timestamps
- [ ] Persist across sessions

---

#### TICKET-027: Create Progress Dashboard Widget

**Priority**: Medium
**Estimate**: 2 points

**Description**:
Build a dashboard widget showing user progress summary.

**Acceptance Criteria**:

- [ ] Display overall completion percentage
- [ ] Show current milestone
- [ ] List next tasks to complete
- [ ] Create visual progress chart
- [ ] Link to full roadmap page

---

#### TICKET-028: Create Roadmap API Routes

**Priority**: High
**Estimate**: 2 points

**Description**:
Build API routes for roadmap functionality.

**Acceptance Criteria**:

- [ ] GET /api/roadmap/milestones - Get all milestones with tasks
- [ ] GET /api/roadmap/progress - Get user's progress
- [ ] PUT /api/roadmap/tasks/:id/progress - Update task completion
- [ ] Implement RLS policies for user progress

---

### Epic 6: Shared Components & UI

#### TICKET-029: Create Reusable Layout Components

**Priority**: High
**Estimate**: 2 points

**Description**:
Build shared layout components used across the app.

**Acceptance Criteria**:

- [ ] Create main navigation component
- [ ] Build sidebar component
- [ ] Create dashboard layout wrapper
- [ ] Build page header component
- [ ] Add breadcrumb component

---

#### TICKET-030: Create Loading and Error States

**Priority**: Medium
**Estimate**: 2 points

**Description**:
Build consistent loading and error UI components.

**Acceptance Criteria**:

- [ ] Create loading spinner component
- [ ] Build skeleton loaders for lists/cards
- [ ] Create error boundary component
- [ ] Build error message component
- [ ] Add empty state components

---

#### TICKET-031: Create User Dashboard Page

**Priority**: High
**Estimate**: 3 points

**Description**:
Build the main user dashboard after login.

**Acceptance Criteria**:

- [ ] Create dashboard layout
- [ ] Add welcome message with user name
- [ ] Include progress summary widget
- [ ] Show recent forum activity
- [ ] Add quick action buttons
- [ ] Make responsive

---

### Epic 7: Deployment & DevOps

#### TICKET-032: Configure Vercel Deployment

**Priority**: High
**Estimate**: 2 points

**Description**:
Set up Vercel deployment pipeline.

**Acceptance Criteria**:

- [ ] Connect repository to Vercel
- [ ] Configure environment variables
- [ ] Set up production branch
- [ ] Configure preview deployments
- [ ] Set up custom domain (if available)

---

#### TICKET-033: Configure Supabase for Production

**Priority**: High
**Estimate**: 2 points

**Description**:
Prepare Supabase project for production use.

**Acceptance Criteria**:

- [ ] Enable email confirmations
- [ ] Configure auth redirect URLs
- [ ] Set up database backups
- [ ] Review and enable RLS policies
- [ ] Configure rate limiting

---

#### TICKET-034: Create README and Documentation

**Priority**: Medium
**Estimate**: 2 points

**Description**:
Document project setup and development workflow.

**Acceptance Criteria**:

- [ ] Write comprehensive README
- [ ] Document environment setup
- [ ] Add database setup instructions
- [ ] Include deployment guide
- [ ] Document API endpoints
- [ ] Add contributing guidelines

---

## Ticket Summary

| Epic                           | Tickets | Total Points |
| ------------------------------ | ------- | ------------ |
| Project Setup & Infrastructure | 5       | 11           |
| User Authentication            | 5       | 12           |
| Landing Page                   | 5       | 11           |
| Forum System                   | 7       | 19           |
| Roadmap/Progress Tracker       | 6       | 15           |
| Shared Components & UI         | 3       | 7            |
| Deployment & DevOps            | 3       | 6            |
| **Total**                      | **34**  | **81**       |

---

## Priority Order

### Must Have (P0)

- TICKET-001 to TICKET-004 (Project Setup)
- TICKET-006, TICKET-007, TICKET-009 (Core Auth)
- TICKET-011 (Landing Page Layout)
- TICKET-016 to TICKET-020, TICKET-022 (Core Forum)
- TICKET-023 to TICKET-026, TICKET-028 (Core Roadmap)
- TICKET-029, TICKET-031 (Essential UI)
- TICKET-032, TICKET-033 (Deployment)

### Should Have (P1)

- TICKET-005 (Code Quality)
- TICKET-008, TICKET-010 (Additional Auth)
- TICKET-012, TICKET-013 (Landing Sections)
- TICKET-021 (Voting)
- TICKET-027 (Dashboard Widget)
- TICKET-030 (Loading/Error States)
- TICKET-034 (Documentation)

### Nice to Have (P2)

- TICKET-014, TICKET-015 (Testimonials, Newsletter)

---

## Definition of Done

- Code is written and follows project style guide
- Unit tests written for critical logic
- Feature tested manually across browsers
- Code reviewed and approved
- Documentation updated
- No console errors or warnings
- Responsive design verified
- Accessibility basics checked

---

## Notes

- Start with infrastructure and auth before features
- Forum and Roadmap can be developed in parallel
- Landing page can be developed alongside other features
- Reserve final week for testing, bug fixes, and polish
- Consider beta testing with 5-10 users before full launch

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  GraduationCap,
  Plane,
  BookOpen,
  MessageSquare,
  Building2,
  ArrowUpDown,
  Clock,
  TrendingUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { PostList } from './post-list';
import type { PostCardProps } from './post-card';

export { PostListSkeleton } from './post-list-skeleton';

const categories = [
  {
    id: 'all',
    label: 'All Topics',
    icon: MessageSquare,
    description: 'View all forum posts',
    color: 'bg-gray-500',
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    icon: GraduationCap,
    description: 'Fulbright, LASPAU, and more',
    color: 'bg-blue-500',
  },
  {
    id: 'visa',
    label: 'Visa',
    icon: Plane,
    description: 'F-1, J-1 visa processes',
    color: 'bg-green-500',
  },
  {
    id: 'tests',
    label: 'Tests',
    icon: BookOpen,
    description: 'TOEFL, GRE, SAT prep',
    color: 'bg-purple-500',
  },
  {
    id: 'university',
    label: 'University',
    icon: Building2,
    description: 'Admissions & campus life',
    color: 'bg-orange-500',
  },
  {
    id: 'general',
    label: 'General',
    icon: MessageSquare,
    description: 'Other discussions',
    color: 'bg-gray-500',
  },
];

// Placeholder posts for demonstration
const placeholderPosts: Omit<PostCardProps, 'category'>[] = [
  {
    id: '1',
    title: 'Tips for Fulbright application essay - My complete guide',
    category: { id: 'scholarships', label: 'Scholarships', color: 'bg-blue-500' },
    author: { username: 'María G.', avatarUrl: null },
    replies: 12,
    views: 234,
    createdAt: '2 hours ago',
    isPinned: true,
    excerpt: 'After successfully applying to Fulbright, I want to share my experience and tips for writing a compelling application essay...',
  },
  {
    id: '2',
    title: 'F-1 visa interview experience in Guatemala City',
    category: { id: 'visa', label: 'Visa', color: 'bg-green-500' },
    author: { username: 'Carlos R.', avatarUrl: null },
    replies: 8,
    views: 156,
    createdAt: '5 hours ago',
    isPinned: false,
    excerpt: 'Just had my F-1 visa interview at the US Embassy. Here\'s what to expect and how to prepare...',
  },
  {
    id: '3',
    title: 'Best TOEFL prep resources for Guatemalans',
    category: { id: 'tests', label: 'Tests', color: 'bg-purple-500' },
    author: { username: 'Ana L.', avatarUrl: null },
    replies: 15,
    views: 312,
    createdAt: '1 day ago',
    isPinned: false,
    excerpt: 'I scored 110 on TOEFL using these free and paid resources. Here are my recommendations...',
  },
  {
    id: '4',
    title: 'How to choose between universities?',
    category: { id: 'university', label: 'University', color: 'bg-orange-500' },
    author: { username: 'Pedro M.', avatarUrl: null },
    replies: 6,
    views: 98,
    createdAt: '2 days ago',
    isPinned: false,
  },
  {
    id: '5',
    title: 'Looking for study buddies in Guatemala',
    category: { id: 'general', label: 'General', color: 'bg-gray-500' },
    author: { username: 'Sofia V.', avatarUrl: null },
    replies: 4,
    views: 67,
    createdAt: '3 days ago',
    isPinned: false,
  },
  {
    id: '6',
    title: 'LASPAU scholarship timeline and requirements',
    category: { id: 'scholarships', label: 'Scholarships', color: 'bg-blue-500' },
    author: { username: 'Diego S.', avatarUrl: null },
    replies: 9,
    views: 189,
    createdAt: '4 days ago',
    isPinned: false,
  },
  {
    id: '7',
    title: 'GRE study plan - 3 months preparation',
    category: { id: 'tests', label: 'Tests', color: 'bg-purple-500' },
    author: { username: 'Laura M.', avatarUrl: null },
    replies: 11,
    views: 245,
    createdAt: '5 days ago',
    isPinned: false,
  },
  {
    id: '8',
    title: 'J-1 vs F-1 visa - Which one is right for you?',
    category: { id: 'visa', label: 'Visa', color: 'bg-green-500' },
    author: { username: 'Roberto A.', avatarUrl: null },
    replies: 7,
    views: 134,
    createdAt: '1 week ago',
    isPinned: false,
  },
] as PostCardProps[];

export function ForumLayout() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = placeholderPosts.filter((post) => {
    if (selectedCategory !== 'all' && post.category.id !== selectedCategory) {
      return false;
    }
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (sortBy === 'popular') {
      return b.views - a.views;
    }
    return 0; // Keep original order for newest
  });

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Forum</h1>
          <p className="text-muted-foreground">
            Connect, share, and learn from fellow students
          </p>
        </div>
        {user ? (
          <Button asChild>
            <Link href="/forum/new">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/auth/login">Sign in to post</Link>
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar - Categories */}
        <aside className="hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-muted ${
                        isActive ? 'bg-muted font-medium' : ''
                      }`}
                    >
                      <div className={`rounded p-1.5 ${category.color}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div>{category.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {category.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Mobile Category Tabs */}
          <div className="mb-4 lg:hidden">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Search and Sort */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Newest
                  </div>
                </SelectItem>
                <SelectItem value="popular">
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Most Popular
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Posts List */}
          <PostList
            posts={sortedPosts}
            pageSize={5}
            emptyMessage="No posts found"
            emptyDescription={
              searchQuery
                ? 'Try a different search term'
                : 'Be the first to start a discussion!'
            }
          />
        </div>
      </div>
    </div>
  );
}

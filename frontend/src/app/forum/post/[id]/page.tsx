import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PostDetail } from '@/components/forum/post-detail';
import { getUser } from '@/lib/auth/get-user';

// Placeholder posts data (same as in forum-layout)
const placeholderPosts = [
  {
    id: '1',
    title: 'Tips for Fulbright application essay - My complete guide',
    content: `After successfully applying to Fulbright, I want to share my experience and tips for writing a compelling application essay.

## Understanding the Fulbright Essay

The Fulbright essay is your chance to tell your story and explain why you're the ideal candidate. Here are my top tips:

### 1. Start Early
Give yourself at least 2-3 months to brainstorm, write, and revise. Don't rush this process!

### 2. Be Specific
Instead of saying "I want to help my community," explain exactly how your project will create impact. Use concrete examples and measurable goals.

### 3. Show Cultural Awareness
Demonstrate that you understand the host country's culture and how you'll navigate it. Research is key!

### 4. Connect Past, Present, and Future
Your essay should weave together:
- Your background and experiences
- Your current goals and project
- Your future plans and how Fulbright fits in

### 5. Get Feedback
Have multiple people review your essay - professors, friends, family, and ideally someone who has received a Fulbright.

## My Personal Experience

When I applied, I focused on my passion for renewable energy and how Guatemala could benefit from knowledge exchange with the US. I made sure to:

- Reference specific professors I wanted to work with
- Explain how my project addressed a real need in Guatemala
- Show my commitment to returning and applying what I learned

Feel free to ask questions in the comments! I'm happy to help fellow Guatemalan students.

**Good luck with your applications!**`,
    category: { id: 'scholarships', label: 'Scholarships', color: 'bg-blue-500' },
    author: {
      id: 'user-1',
      username: 'María G.',
      avatarUrl: null,
    },
    replies: 12,
    views: 234,
    createdAt: '2024-01-15T10:30:00Z',
    isPinned: true,
  },
  {
    id: '2',
    title: 'F-1 visa interview experience in Guatemala City',
    content: `Just had my F-1 visa interview at the US Embassy. Here's what to expect and how to prepare.

## Before the Interview

### Documents I Brought
- DS-160 confirmation page
- I-20 form
- Passport (current and old)
- SEVIS fee receipt
- Financial documents (bank statements, sponsor letters)
- Admission letter
- Academic transcripts
- Standardized test scores

### Preparation
I practiced common questions with friends and family. Some questions I prepared for:
- Why do you want to study in the US?
- Why this specific university/program?
- How will you finance your studies?
- What are your plans after graduation?
- Do you have ties to Guatemala?

## The Interview Day

I arrived at 6:30 AM for my 7:30 AM appointment. The process took about 3 hours total.

### The Interview Itself
My interview lasted about 5 minutes. The officer asked:
1. What will you study?
2. Why did you choose this university?
3. Who is sponsoring you?
4. What do you plan to do after graduation?

I was approved on the spot! The key was being confident, concise, and honest.

## Tips for Success

1. **Be confident but not arrogant**
2. **Keep answers short and direct**
3. **Bring organized documents**
4. **Dress professionally**
5. **Arrive early**

Good luck to everyone with upcoming interviews!`,
    category: { id: 'visa', label: 'Visa', color: 'bg-green-500' },
    author: {
      id: 'user-2',
      username: 'Carlos R.',
      avatarUrl: null,
    },
    replies: 8,
    views: 156,
    createdAt: '2024-01-15T08:00:00Z',
    isPinned: false,
  },
  {
    id: '3',
    title: 'Best TOEFL prep resources for Guatemalans',
    content: `I scored 110 on TOEFL using these free and paid resources. Here are my recommendations.

## Free Resources

### YouTube Channels
- **TST Prep** - Excellent for all sections
- **NoteFull** - Great speaking templates
- **TOEFL Resources** - Official ETS content

### Websites
- **ETS TOEFL Practice** - Free practice tests from the official source
- **Magoosh Blog** - Strategy articles

## Paid Resources

### What I Used
1. **Official ETS Materials** ($40) - Essential for understanding the real test format
2. **Magoosh TOEFL** ($100) - Video lessons and practice questions

## My Study Plan (3 months)

**Month 1:** Focus on vocabulary and reading
- Learn 20 new words daily
- Read academic articles

**Month 2:** Speaking and writing practice
- Record yourself daily
- Write one essay per day

**Month 3:** Full practice tests
- Take 2 practice tests per week
- Review all mistakes

## Section-Specific Tips

### Reading
- Don't read the whole passage first
- Go straight to questions

### Listening
- Take notes!
- Focus on main ideas

### Speaking
- Use templates
- Practice with a timer

### Writing
- Have clear structure
- Use specific examples

Let me know if you have questions!`,
    category: { id: 'tests', label: 'Tests', color: 'bg-purple-500' },
    author: {
      id: 'user-3',
      username: 'Ana L.',
      avatarUrl: null,
    },
    replies: 15,
    views: 312,
    createdAt: '2024-01-14T14:00:00Z',
    isPinned: false,
  },
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = placeholderPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: 'Post Not Found - GuateAbroad',
    };
  }

  return {
    title: `${post.title} - GuateAbroad`,
    description: post.content.substring(0, 160),
  };
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = placeholderPosts.find((p) => p.id === id);
  const currentUser = await getUser();

  if (!post) {
    notFound();
  }

  // Check if current user is the author
  const isAuthor = currentUser?.id === post.author.id;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <PostDetail post={post} isAuthor={isAuthor} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

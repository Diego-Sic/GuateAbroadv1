import {
  BookOpen,
  Users,
  Map,
  MessageSquare,
  Target,
  Award,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Map,
    title: 'Step-by-Step Roadmap',
    description:
      'Follow a clear path from initial research to application submission with our guided milestones.',
  },
  {
    icon: Users,
    title: 'Community Forum',
    description:
      'Connect with fellow Guatemalan students, share experiences, and get advice from those who succeeded.',
  },
  {
    icon: BookOpen,
    title: 'Resource Library',
    description:
      'Access curated resources for test prep, essay writing, and scholarship research all in one place.',
  },
  {
    icon: Target,
    title: 'Progress Tracking',
    description:
      'Track your application progress across multiple scholarships and never miss a deadline.',
  },
  {
    icon: MessageSquare,
    title: 'Expert Guidance',
    description:
      'Get answers to your questions from experienced students and mentors in the community.',
  },
  {
    icon: Award,
    title: 'Success Stories',
    description:
      'Learn from Guatemalans who have successfully obtained scholarships to study in the US.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-muted/50 py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            We&apos;ve built the tools and community to help you navigate every
            step of your scholarship journey.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 bg-background">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/0.1),transparent)]" />

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border bg-muted px-4 py-1.5 text-sm">
            <GraduationCap className="mr-2 h-4 w-4 text-primary" />
            <span>For Guatemalan Students</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Journey to{' '}
            <span className="text-primary">US Scholarships</span> Starts Here
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Navigate the complex world of US scholarship applications with
            centralized information, community support, and a clear roadmap to
            success.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/forum">Explore Community</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <p className="mt-8 text-sm text-muted-foreground">
            Join hundreds of Guatemalan students pursuing their dreams
          </p>
        </div>
      </div>
    </section>
  );
}

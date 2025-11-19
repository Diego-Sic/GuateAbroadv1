import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
    return (
        <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
                <h2 className="mb-4 text-3xl font-bold">Ready to Start Your Journey?</h2>
                <p className="mb-8 text-lg opacity-90">
                    Join our community of ambitious Guatemalan students today.
                </p>
                <Link
                    href="/auth/register"
                    className="inline-flex h-11 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-primary ring-offset-background transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    Create Free Account
                </Link>
            </div>
        </section>
    );
}

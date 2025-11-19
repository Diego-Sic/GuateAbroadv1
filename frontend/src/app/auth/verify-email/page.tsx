import Link from 'next/link';
import { Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata = {
  title: 'Verify Email - GuateAbroad',
  description: 'Check your email to verify your GuateAbroad account',
};

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent you a verification link to confirm your email
            address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click the link in the email to verify your account. If you
            don&apos;t see the email, check your spam folder.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/auth/login">Back to login</Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive the email?{' '}
            <Link
              href="/auth/register"
              className="text-primary underline-offset-4 hover:underline"
            >
              Try again
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

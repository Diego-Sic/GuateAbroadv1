import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Sign In - GuateAbroad',
  description: 'Sign in to your GuateAbroad account',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <LoginForm />
    </div>
  );
}

import { RegisterForm } from '@/components/auth/register-form';

export const metadata = {
  title: 'Create Account - GuateAbroad',
  description:
    'Create your GuateAbroad account to start your scholarship journey',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <RegisterForm />
    </div>
  );
}

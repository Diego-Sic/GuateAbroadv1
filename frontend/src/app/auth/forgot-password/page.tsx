import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export const metadata = {
  title: 'Forgot Password - GuateAbroad',
  description: 'Reset your GuateAbroad account password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <ForgotPasswordForm />
    </div>
  );
}

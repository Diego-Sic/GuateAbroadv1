import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export const metadata = {
  title: 'Reset Password - GuateAbroad',
  description: 'Set a new password for your GuateAbroad account',
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <ResetPasswordForm />
    </div>
  );
}

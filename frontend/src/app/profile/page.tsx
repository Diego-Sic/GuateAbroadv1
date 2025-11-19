import { redirect } from 'next/navigation';
import { getUserProfile } from '@/lib/auth/get-user';
import { EditProfileForm } from '@/components/profile/edit-profile-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Profile - GuateAbroad',
  description: 'Manage your GuateAbroad profile',
};

export default async function ProfilePage() {
  const profile = await getUserProfile();

  if (!profile) {
    redirect('/auth/login');
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and profile information.
          </p>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your profile information visible to other users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditProfileForm user={profile} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>
              Your activity and reputation on GuateAbroad.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{profile.reputation_score}</p>
                <p className="text-sm text-muted-foreground">
                  Reputation Score
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {profile.email_verified ? 'Yes' : 'No'}
                </p>
                <p className="text-sm text-muted-foreground">Email Verified</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {new Date(profile.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">Member Since</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

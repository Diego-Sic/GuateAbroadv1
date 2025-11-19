# Product Backlog

This document contains tickets that are not part of the current sprint but should be addressed.

---

## Infrastructure & Configuration

### BACKLOG-001: Configure Supabase Storage for Profile Images
**Priority**: High
**Estimate**: 1 point
**Blocking**: TICKET-010 (Profile image upload functionality)

**Description**:
Set up Supabase Storage bucket and policies to support profile image uploads.

**Acceptance Criteria**:
- [ ] Create `profiles` storage bucket in Supabase dashboard
- [ ] Set bucket to public access
- [ ] Configure storage policies for authenticated uploads
- [ ] Set up CORS if needed
- [ ] Test image upload and retrieval
- [ ] Document storage configuration

**Technical Details**:
```sql
-- Storage policy for profile images
-- Users can upload their own avatar
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own avatar
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own avatar
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Anyone can view avatars
CREATE POLICY "Public avatar access"
ON storage.objects FOR SELECT
USING (bucket_id = 'profiles');
```

**Steps to Complete**:
1. Go to Supabase Dashboard → Storage
2. Create new bucket named `profiles`
3. Set public access to true
4. Apply the storage policies above
5. Test upload from profile page

---

## Future Enhancements

### BACKLOG-002: Add Social Login (OAuth)
**Priority**: Low
**Estimate**: 3 points

**Description**:
Add social login options (Google, GitHub) for easier registration.

**Acceptance Criteria**:
- [ ] Configure OAuth providers in Supabase
- [ ] Add social login buttons to register/login forms
- [ ] Handle OAuth callback
- [ ] Create user profile on first social login

---

### BACKLOG-003: Email Templates Customization
**Priority**: Low
**Estimate**: 2 points

**Description**:
Customize Supabase email templates for better branding.

**Acceptance Criteria**:
- [ ] Design email templates with GuateAbroad branding
- [ ] Customize verification email
- [ ] Customize password reset email
- [ ] Test all email flows

---

### BACKLOG-004: Account Deletion
**Priority**: Medium
**Estimate**: 2 points

**Description**:
Allow users to delete their account and all associated data.

**Acceptance Criteria**:
- [ ] Add delete account button to profile/settings
- [ ] Confirmation dialog with password verification
- [ ] Delete all user data (posts, replies, progress)
- [ ] Delete auth user
- [ ] Send confirmation email

---

## Notes

- Items in this backlog should be prioritized and moved to sprints as needed
- High priority items blocking current features should be addressed immediately
- Estimates are in story points (1 point ≈ 1-2 hours of work)

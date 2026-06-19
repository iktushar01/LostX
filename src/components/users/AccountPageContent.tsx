"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCookie } from "cookies-next";
import { AccountSummary } from "@/types/lostx.types";
import { TrustBadge } from "@/components/users/TrustBadge";
import { UserStatsGrid } from "@/components/users/UserStatsGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { updateProfileAction } from "@/actions/authActions/_updateProfileAction";
import { deleteAccountAction } from "@/actions/lostx/user-profile.actions";
import { Spinner } from "@/components/ui/spinner";

interface AccountPageContentProps {
  summary: AccountSummary;
}

export function AccountPageContent({ summary }: AccountPageContentProps) {
  const router = useRouter();
  const [name, setName] = useState(summary.user.name);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(summary.user.image);
  const [saving, setSaving] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  const statLabels = {
    lostReports: "Lost reports",
    foundReports: "Found reports",
    recoveredItems: "Recovered items",
    approvedClaims: "Approved claims",
    pendingClaims: "Pending claims",
    successfulHandoffs: "Successful handoffs",
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    const formData = new FormData();
    formData.append("name", name);
    if (imageFile) formData.append("image", imageFile);
    const result = await updateProfileAction(formData);
    setSaving(false);
    if (!result.success) {
      toast.error(result.message ?? "Failed to update profile");
      return;
    }
    toast.success("Profile updated");
    router.refresh();
  };

  const handleDeleteAccount = async () => {
    if (confirmEmail !== summary.user.email) {
      toast.error("Email confirmation does not match.");
      return;
    }
    setDeleting(true);
    const result = await deleteAccountAction({
      email: confirmEmail,
      password: summary.hasCredentialLogin ? password : undefined,
    });
    setDeleting(false);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    deleteCookie("user");
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("better-auth.session_token");
    toast.success("Account deleted");
    window.location.assign("/");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
        <p className="text-sm text-muted-foreground">Manage your LostX profile and campus activity.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update how others see you on LostX.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-name">Display name</Label>
            <Input id="account-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <ImageUploadField
            previewUrl={imagePreview}
            onFileChange={(file) => {
              setImageFile(file);
              setImagePreview(file ? URL.createObjectURL(file) : summary.user.image);
            }}
            onClear={() => {
              setImageFile(null);
              setImagePreview(null);
            }}
          />
          <Button onClick={handleSaveProfile} disabled={saving}>
            {saving ? <Spinner className="h-4 w-4" /> : "Save profile"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{summary.user.email}</span>
            {summary.user.emailVerified && <Badge variant="secondary">Verified</Badge>}
          </div>
          <div>
            <span className="text-muted-foreground">Member since </span>
            <span className="font-medium">
              {new Date(summary.user.memberSince).toLocaleDateString()}
            </span>
          </div>
          <TrustBadge tier={summary.trust.tier} score={summary.trust.score} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity summary</CardTitle>
        </CardHeader>
        <CardContent>
          <UserStatsGrid stats={summary.stats} labels={statLabels} />
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>
            Deleting your account anonymizes your profile. Listings and claims remain for campus audit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label>Type your email to confirm</Label>
            <Input value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
          </div>
          {summary.hasCredentialLogin && (
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <Button variant="destructive" onClick={handleDeleteAccount} disabled={deleting}>
            {deleting ? <Spinner className="h-4 w-4" /> : "Delete account"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

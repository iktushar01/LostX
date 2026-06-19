import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicProfileAction, getUserReviewsAction } from "@/actions/lostx/user-profile.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { TrustBadge } from "@/components/users/TrustBadge";
import { UserStatsGrid } from "@/components/users/UserStatsGrid";
import { ReviewList } from "@/components/users/ReviewList";
import { ReportUserDialog } from "@/components/users/ReportUserDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatLabel } from "@/components/shared/ItemBadges";
import { Star } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PublicProfilePage({ params }: Props) {
  const { id } = await params;
  const [profileResult, reviewsResult, userResult] = await Promise.all([
    getPublicProfileAction(id),
    getUserReviewsAction(id),
    getCurrentUserAction(),
  ]);

  if (!profileResult.success || !profileResult.data) notFound();

  const profile = profileResult.data;
  const reviews = reviewsResult.data ?? [];

  if (!profile.available) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <h1 className="text-xl font-semibold">Account unavailable</h1>
        <p className="mt-2 text-muted-foreground">{profile.message}</p>
      </div>
    );
  }

  const statLabels = {
    lostReports: "Lost reports",
    foundReports: "Found reports",
    recoveredItems: "Recovered",
    successfulHandoffs: "Handoffs",
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.image ?? undefined} alt={profile.name} />
            <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">{profile.name}</h1>
            <p className="text-sm text-muted-foreground">
              Member since {new Date(profile.memberSince).toLocaleDateString()}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <TrustBadge tier={profile.trust.tier} score={profile.trust.score} />
              {profile.emailVerified && <Badge variant="secondary">Email verified</Badge>}
            </div>
          </div>
        </div>
        {profile.canReport && userResult.success && userResult.data && (
          <ReportUserDialog reportedId={profile.id} reportedName={profile.name} />
        )}
      </div>

      {profile.reviews.averageRating != null && (
        <div className="flex items-center gap-2 text-sm">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium">{profile.reviews.averageRating}</span>
          <span className="text-muted-foreground">({profile.reviews.count} reviews)</span>
        </div>
      )}

      <UserStatsGrid stats={profile.stats} labels={statLabels} />

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground">No public activity yet.</p>
          ) : (
            <ul className="space-y-2">
              {profile.recentActivity.map((item) => (
                <li key={`${item.type}-${item.id}`} className="flex items-center justify-between text-sm">
                  <Link
                    href={`/dashboard/${item.type}/${item.id}`}
                    className="font-medium hover:underline"
                  >
                    {item.title}
                  </Link>
                  <span className="text-muted-foreground">
                    {formatLabel(item.category)} · {item.type}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewList reviews={reviews} />
        </CardContent>
      </Card>
    </div>
  );
}

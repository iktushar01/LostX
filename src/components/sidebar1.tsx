import { AppSidebar } from "@/components/modules/dashboard/Sidebar";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import type { NotificationItem } from "@/components/layout/NotificationsMenu";
import { getSidebarData } from "@/lib/getSidebarData";
import { getCookie } from "@/lib/cookieUtils";
import { getUserInfo } from "@/services/auth/auth.services";
import { getNotificationsAction } from "@/actions/lostx/notification.actions";
import { getMyClaimsAction } from "@/actions/lostx/claim.actions";
import { UserFromCookie } from "@/types/auth.types";
import { cn } from "@/lib/utils";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

function buildNotifications(
  claims: Awaited<ReturnType<typeof getMyClaimsAction>>["data"],
): NotificationItem[] {
  if (!claims) return [];

  return claims
    .filter((claim) => claim.status === "APPROVED" || claim.status === "PENDING")
    .slice(0, 6)
    .map((claim) => {
      const itemTitle = claim.foundItem?.title ?? "your claim";
      const date = new Date(claim.updatedAt ?? claim.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });

      if (claim.status === "APPROVED") {
        return {
          id: claim.id,
          title: "Claim approved",
          description: `Your claim for ${itemTitle} was approved.`,
          href: "/claims",
          date,
          kind: "claim-approved" as const,
        };
      }

      return {
        id: claim.id,
        title: "Claim under review",
        description: `Your claim for ${itemTitle} is awaiting admin review.`,
        href: "/claims",
        date,
        kind: "claim-pending" as const,
      };
    });
}

interface Sidebar1Props {
  className?: string;
  children?: React.ReactNode;
}

const Sidebar1 = async ({ className, children }: Sidebar1Props) => {
  const userCookie = await getCookie("user");
  let user: UserFromCookie | null = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie) as UserFromCookie;
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }

  if (!user) {
    const backendUser = await getUserInfo();

    if (backendUser) {
      const avatar =
        backendUser.image ??
        backendUser.client?.profilePhoto ??
        backendUser.admin?.profilePhoto ??
        null;

      user = {
        name: backendUser.name,
        email: backendUser.email,
        role: backendUser.role,
        avatar,
        image: backendUser.image ?? avatar,
      };
    }
  }

  const userRole = user?.role ?? "CLIENT";
  const sidebarData = await getSidebarData(userRole as "ADMIN" | "CLIENT");

  const [notificationsResult, claimsResult] = await Promise.all([
    getNotificationsAction(),
    getMyClaimsAction(),
  ]);

  const notifications =
    notificationsResult.data && notificationsResult.data.length > 0
      ? notificationsResult.data
      : buildNotifications(claimsResult.data);

  return (
    <SidebarProvider className={cn(className)}>
      <AppSidebar data={sidebarData} user={user} />

      <SidebarInset className="bg-slate-50/50 dark:bg-slate-950/50">
        <DashboardTopBar notifications={notifications} />
        <main className="flex flex-1 flex-col">
          <div className="flex-1 p-4 md:p-6 lg:p-8">{children}</div>
        </main>
        <ChatWidget />
      </SidebarInset>
    </SidebarProvider>
  );
};

export { Sidebar1 };

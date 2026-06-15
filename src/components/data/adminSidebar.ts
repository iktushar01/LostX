import { SidebarData } from "@/types/sidebar";
import { LOSTX_LOGO_LIGHT } from "@/components/shared/logo/logo";

export const adminSidebar: SidebarData = {
  logo: {
    src: LOSTX_LOGO_LIGHT,
    alt: "LostX logo",
    title: "LostX",
    description: "Admin Panel",
  },
  navGroups: [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", icon: "LayoutDashboard", href: "/admin" },
      ],
    },
    {
      title: "Lost & Found",
        items: [
        { label: "Browse", icon: "ClipboardList", href: "/browse" },
        { label: "Claim Management", icon: "ShieldCheck", href: "/admin/claims" },
      ],
    },
    {
      title: "System",
      items: [
        { label: "Settings", icon: "Settings", href: "/admin/dashboard/settings" },
      ],
    },
  ],
};

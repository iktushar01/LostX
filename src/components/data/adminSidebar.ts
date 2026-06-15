import { SidebarData } from "@/types/sidebar";

export const adminSidebar: SidebarData = {
  logo: {
    src: "/logo-light.svg",
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

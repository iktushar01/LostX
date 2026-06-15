import { SidebarData } from "@/types/sidebar";
import { LOSTX_LOGO_LIGHT } from "@/components/shared/logo/logo";

export const adminSidebar: SidebarData = {
  logo: {
    src: LOSTX_LOGO_LIGHT,
    alt: "LostX logo",
    title: "LostX",
    description: "Admin",
  },
  navGroups: [
    {
      title: "Admin",
      items: [
        { label: "Admin Dashboard", icon: "ShieldCheck", href: "/admin" },
        { label: "Manage Claims", icon: "FileCheck", href: "/admin/claims" },
        { label: "Settings", icon: "Settings", href: "/admin/dashboard/settings" },
      ],
    },
  ],
};

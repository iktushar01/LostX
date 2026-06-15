import { SidebarData } from "@/types/sidebar";

export const adminSidebar: SidebarData = {
  logo: {
    src: "/logo.png",
    alt: "Injentro logo",
    title: "Injentro",
    description: "Admin Panel",
  },
  navGroups: [
    {
      title: "Overview",
      items: [
        { label: "Dashboard",      icon: "LayoutDashboard", href: "/admin/dashboard" },
      ],
    },
    // {
    //   title: "Management",
    //   items: [
    //     { label: "Users",               icon: "Users",       href: "/dashboard/admin/users" },
    //     { label: "Roles & Permissions", icon: "ShieldCheck", href: "/dashboard/admin/roles" },
    //   ],
    // },
    {
      title: "System",
      items: [
        { label: "Settings", icon: "Settings", href: "/admin/dashboard/settings" },
      ],
    },
  ],
};

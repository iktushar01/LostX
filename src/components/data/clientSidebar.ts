import { SidebarData } from "@/types/sidebar";

export const getClientSidebarData = async (): Promise<SidebarData> => {
  return {
    logo: {
      src: "/logo.png",
      alt: "Injentro logo",
      title: "Injentro",
      description: "Student Panel",
    },
    navGroups: [
      {
        title: "Main",
        items: [
          {
            label: "Dashboard",
            icon: "LayoutDashboard",
            href: "/dashboard",
          },
          {
            label: "Settings",
            icon: "Settings",
            href: "/dashboard/settings",
          },
        ],
      },
    ],
  };
};
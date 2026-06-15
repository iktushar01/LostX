import { SidebarData } from "@/types/sidebar";
import { LOSTX_LOGO_LIGHT } from "@/components/shared/logo/logo";

export const getClientSidebarData = async (): Promise<SidebarData> => {
  return {
    logo: {
      src: LOSTX_LOGO_LIGHT,
      alt: "LostX logo",
      title: "LostX",
      description: "Student Panel",
    },
    navGroups: [
      {
        title: "Lost & Found",
        items: [
          { label: "Browse", icon: "ClipboardList", href: "/browse" },
          { label: "Lost Items", icon: "ClipboardList", href: "/dashboard/lost" },
          { label: "Found Items", icon: "BookOpen", href: "/dashboard/found" },
          { label: "My Claims", icon: "MessageSquare", href: "/claims" },
        ],
      },
      {
        title: "Main",
        items: [
          { label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
          { label: "Settings", icon: "Settings", href: "/dashboard/settings" },
        ],
      },
    ],
  };
};

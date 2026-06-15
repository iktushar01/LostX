import { SidebarData } from "@/types/sidebar";
import { LOSTX_LOGO_LIGHT } from "@/components/shared/logo/logo";

export const getClientSidebarData = async (): Promise<SidebarData> => {
  return {
    logo: {
      src: LOSTX_LOGO_LIGHT,
      alt: "LostX logo",
      title: "LostX",
      description: "Lost & Found",
    },
    navGroups: [
      {
        title: "Menu",
        items: [
          { label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
          { label: "My Lost Items", icon: "ClipboardList", href: "/dashboard/lost" },
          { label: "Found Items", icon: "PackageSearch", href: "/dashboard/found" },
          { label: "Browse Items", icon: "Search", href: "/browse" },
          { label: "Claims", icon: "HandHelping", href: "/claims" },
          { label: "Settings", icon: "Settings", href: "/dashboard/settings" },
        ],
      },
    ],
  };
};

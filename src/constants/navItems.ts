// src/constants/navItems.ts

import { RouteEnum } from "@/enum/RouteEnum";
import {
  MdDashboard,
  MdOutlineWork,
  MdNotificationsNone,
  MdSettings,
} from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";
import { Briefcase } from "lucide-react";

export const appNavItems: {
  label: string;
  href: RouteEnum;
  icon: React.ElementType;
}[] = [
  {
    label: "Dashboard",
    href: RouteEnum.DASHBOARD,
    icon: MdDashboard,
  },
  {
    label: "Trackers",
    href: RouteEnum.TRACKERS,
    icon: MdOutlineWork,
  },
  {
    label: "Changes",
    href: RouteEnum.CHANGES,
    icon: FiRefreshCw,
  },
  {
    label: "Alerts",
    href: RouteEnum.ALERTS,
    icon: MdNotificationsNone,
  },
  {
    label: "Settings",
    href: RouteEnum.SETTINGS,
    icon: MdSettings,
  },
];

export const publicNavItems: {
  label: string;
  href: RouteEnum;
}[] = [
  {
    label: "About",
    href: RouteEnum.ABOUT,
  },
  {
    label: "Contact",
    href: RouteEnum.CONTACT,
  },
];
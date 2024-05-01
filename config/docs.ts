// config/docs.ts
import { type SidebarNavItem } from "@/types";

export const docItems: SidebarNavItem[] = [
  {
    title: "General",
    items: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "About Bluetick",
        href: "/about",
      },
      {
        title: "Commands",
        href: "/commands",
        disabled: true,
      },
      {
        title: "Dashboard",
        href: "https://bluetick.khainguyen.dev/",
      },
      {
        title: "Discord Support",
        href: "https://discord.gg/AVd5wjzemH",
      },
    ],
  },
  {
    title: "Dashboard",
    items: [
      {
        title: "General Settings",
        href: "/dashboard",
      },
      {
        title: "Action Logs",
        href: "/dashboard/action-logs",
      },
      {
        title: "Auto Responder",
        href: "/dashboard/auto-responder",
      },
      {
        title: "Auto Roles",
        href: "/dashboard/auto-roles",
      },
      {
        title: "Ticket System",
        href: "/dashboard/ticket-system",
      },
      {
        title: "Twitch Notification",
        href: "/dashboard/twitch",
        note: "new",
      },
      {
        title: "Welcome New Member",
        href: "/dashboard/welcome",
      },
    ],
  },
  {
    title: "FAQ",
    items: [
      {
        title: "Bot Permissions",
        href: "/faq/permissions",
      },
      {
        title: "Discord Message",
        href: "/faq/discord-message",
      },
      {
        title: "Notification Types",
        href: "/faq/notifications",
      },
      {
        title: "Using Placeholders/Variables",
        href: "/faq/placeholders",
      },
    ],
  },
  {
    title: "GUIDES",
    items: [
      {
        title: "Create Your Ticket System",
        href: "/guides/ticket-system",
        note: "new",
      },
    ],
  },
];

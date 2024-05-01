import { type MainNavItem, type SiteConfig } from "@/types";

export const mainNavItems: MainNavItem[] = [
  {
    title: "Playlist Generators",
    items: [
      {
        title: "Quick Generator",
        href: "/generate/quick-playlists",
        description: "Quick generation with 3 simple steps",
      },
      {
        title: "Mood Tuner Generator",
        href: "/generate/mood-tuner",
        description: `Customize playlists to match your mood`,
      },
      {
        title: "Favorites Mixer Generator",
        href: "/generate/favorites-mixer",
        description:
          "Create playlists from your top genres, tracks, and artists.",
      },
      // {
      //   title: 'Discovery Composer Generator',
      //   href: '/generate/favorites-mixer',
      //   description:
      //     'Search and select artists and tracks to discover new music.',
      // },
    ],
  },
  {
    title: "Learn more",
    items: [
      {
        title: "Privacy",
        href: "/privacy",
        description: "Our privacy policy",
      },
      {
        title: "Terms of Service",
        href: "/terms-of-service",
      },
    ],
  },
];

export const siteConfig: SiteConfig = {
  name: "Euterpefy",
  description: "Music playlist recommender and generator",
  href: "/",
  mainNav: mainNavItems,
  footerNav: [
    {
      title: "Privacy policy",
      href: "/privacy",
    },
    {
      title: "Terms of Service",
      href: "/terms-of-service",
    },
  ],
};

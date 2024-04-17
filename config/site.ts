import { MainNavItem, SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Euterpefy',
  description: 'Music playlist recommender and generator',
  href: '/',
  mainNav: [],
};

export const mainNavItems: MainNavItem[] = [
  {
    title: 'Features',
    items: [
      {
        title: 'Quick Generating',
        href: '/generate',
        description: 'Quick generation with 3 simple steps',
      },
      {
        title: 'Advanced Generating',
        href: '/advanced-generate',
        description: `Adjust your playlist's mood, loudness, popularity, etc.`,
      },
    ],
  },
  {
    title: 'Learn more',
    items: [
      {
        title: 'Privacy',
        href: '/privacy',
        description: 'Our privacy policy',
      },
    ],
  },
];

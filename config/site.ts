import { MainNavItem, SiteConfig } from '@/types';

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
      {
        title: 'Terms of Service',
        href: '/terms-of-service',
      },
    ],
  },
];

export const siteConfig: SiteConfig = {
  name: 'Euterpefy',
  description: 'Music playlist recommender and generator',
  href: '/',
  mainNav: mainNavItems,
  footerNav: [
    {
      title: 'Privacy policy',
      href: '/privacy',
    },
    {
      title: 'Terms of Service',
      href: '/terms-of-service',
    },
  ],
};

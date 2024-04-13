export type NavMenu = {
  title: string;
  items: NavItem[];
  description?: {
    href?: string;
    title?: string;
    image?: string;
    content: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  image?: string;
};

export type MainNavItem = NavItem | NavMenu;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  note?: 'new' | 'special';
  Icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: SidebarNavItem[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  href: string;
  mainNav: MainNavItem[];
};

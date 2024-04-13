import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useLockBody } from '@/hooks/use-lock-body';
import { Icons } from '@/components/icons';
import type { MainNavItem, NavMenu } from '@/types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
  isOpen: boolean; // Added to represent the open state
  onClose: () => void;
}

/**
 * Renders a mobile navigation menu that is toggleable via the `isOpen` prop.
 *
 * The navigation presents the site's logo and a list of navigation items. It uses the `useLockBody`
 * hook to prevent body scroll when open. The `onClose` callback is invoked to close the menu.
 * @param {MobileNavProps} props - The props for the MobileNav component.
 * @returns {JSX.Element} - The MobileNav component.
 */
export function MobileNav({
  items,
  children,
  isOpen,
  onClose,
}: MobileNavProps): JSX.Element {
  useLockBody(isOpen); // Pass the `isOpen` state to the hook

  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden backdrop-blur-lg'
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link
          href={'/'}
          onClick={onClose}
          className="flex items-center space-x-2 text-xl"
        >
          <Icons.logo size={32} />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => {
            if (isNavMenu(item)) {
              return (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="flex items-center gap-2 text-foreground">
                    {item.title} <ChevronDown />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.items.map((nav_item, i) => {
                      return (
                        <Link
                          key={i}
                          onClick={onClose}
                          href={nav_item.disabled ? '#' : nav_item.href}
                          className={cn(
                            'flex w-full items-center rounded-md py-2 px-6 text-sm font-medium hover:underline',
                            nav_item.disabled && 'cursor-not-allowed opacity-60'
                          )}
                        >
                          {nav_item.title}
                        </Link>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              );
            } else {
              return (
                <Link
                  key={index}
                  onClick={onClose}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex w-full items-center rounded-md py-2 text-sm font-medium hover:underline',
                    item.disabled && 'cursor-not-allowed opacity-60'
                  )}
                >
                  {item.title}
                </Link>
              );
            }
          })}
        </nav>
        {children}
      </div>
    </div>
  );
}

/**
 * Type guard to determine if a given navigation item is a submenu.
 *
 * This function checks if the 'items' property exists on the navigation item, indicating it's a NavMenu.
 * @param {MainNavItem} item - The navigation item to check.
 * @returns {boolean} - Returns true if the item is a NavMenu; otherwise, false.
 */
function isNavMenu(item: MainNavItem): item is NavMenu {
  return (item as NavMenu).items !== undefined;
}
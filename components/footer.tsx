import * as React from 'react';

import type { JSX } from 'react'; // Changed to import type
import { cn } from '@/lib/utils';
import type { AdditionalProps } from '.';
import { ModeToggle } from './mode-toggle';
import { Icons } from './icons';
import { poppinsFont, rubikFont } from '@/styles/fonts';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

/**
 * Renders the footer section of the application
 * @param {AdditionalProps} props - The props object for the Footer component.
 * @param {string} props.className - Optional CSS class to apply to the footer element for custom styling.
 * @returns {JSX.Element} The Footer component with subscription form and social media links.
 */
export function Footer({ className }: AdditionalProps): JSX.Element {
  return (
    <footer className={cn(className)}>
      <div className="w-full px-2 md:px-4 lg:px-6 py-8 bg-secondary flex justify-between items-center ">
        <div className="container flex flex-col items-start text-center">
          <a className="flex items-center gap-4 text-md text-info" href="/">
            <Icons.logo height={40} width={40} />
            <span
              className={cn(
                rubikFont.className,
                'uppercase font-bold text-xl '
              )}
            >
              {siteConfig.name}
            </span>
          </a>
          <span className="text-sm mt-2 text-muted-foreground">
            Let the music find you. @2023-2024
          </span>
          {siteConfig.footerNav && (
            <div className="flex flex-wrap mt-2 gap-2">
              {siteConfig.footerNav.map((navItem, index) => (
                <Link
                  key={index}
                  href={navItem.href}
                  className={cn(
                    'capitalize font-medium text-xs underline text-secondary-foreground/50',
                    poppinsFont.className
                  )}
                >
                  {navItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}

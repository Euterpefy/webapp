import React from 'react';
import CallToAction from '@/components/home/call-to-action';
import { cn } from '@/lib/utils';
import { poppinsFont } from '@/styles/fonts';

/**
 * Home component that represents the main content of the homepage.
 * @returns {JSX.Element} The Home component.
 */
export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col items-center text-center mt-4 gap-4">
      <p className={cn(poppinsFont.className, 'text-3xl font-bold capitalize')}>
        Dive into a world where every note understands you
      </p>
      <p className="font-medium text-lg">
        Generate based on your vibes and import it to Spotify
      </p>
      <CallToAction />
    </div>
  );
}

'use client';

import React from 'react';
import { useAuthenticatedSession } from '@/hooks/use-authenticated-session';
import FavMixerStepper from '@/app/(with-layout)/generate/favorites-mixer/_components/stepper';
import { cn } from '@/lib/utils';
import { poppinsFont } from '@/styles/fonts';

const FavMixerPage = () => {
  const { data: session, status } = useAuthenticatedSession();

  if (status === 'loading') {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (status === 'unauthenticated' || !session) {
    return <div className="flex justify-center">Unauthorized request</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="mt-4 mx-4 w-full max-w-[1028px] flex flex-col gap-2">
        <div className={cn('text-3xl font-bold', poppinsFont.className)}>
          Quick Playlist Generator
        </div>
        <FavMixerStepper />
      </div>
    </div>
  );
};

export default FavMixerPage;

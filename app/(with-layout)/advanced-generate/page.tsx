'use client';

import React from 'react';
import GenerateSteps from '@/components/generate/stepper';
import { useAuthenticatedSession } from '@/hooks/use-authenticated-session';

const AdvancedGeneratingPage = () => {
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
        <GenerateSteps advanced={true} />
      </div>
    </div>
  );
};

export default AdvancedGeneratingPage;

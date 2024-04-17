'use client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const CallToAction = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleButtonClick = (rerouteTo: string): void => {
    if (session) {
      router.push(rerouteTo);
    } else {
      // popupCenter('/spotify-signin', 'Spotify Sign In');
      signIn('spotify', { callbackUrl: rerouteTo }).catch(() => {
        toast.error('Failed to initiate log in with Spotify');
      });
    }
  };

  return (
    <div>
      {status === 'loading' ? (
        <Skeleton className="rounded-lg w-24 h-10" />
      ) : (
        <Button
          className="rounded-[24px]"
          variant={'outline'}
          onClick={() => {
            handleButtonClick('/advanced-generate');
          }}
        >
          Start customizing
        </Button>
      )}
    </div>
  );
};

export default CallToAction;

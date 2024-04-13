'use client';
import React from 'react';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';

const CallToAction = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // const popupCenter = (url: string, title: string) => {
  //   const dualScreenLeft = window.screenLeft ?? window.screenX;
  //   const dualScreenTop = window.screenTop ?? window.screenY;

  //   const width =
  //     window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  //   const height =
  //     window.innerHeight ??
  //     document.documentElement.clientHeight ??
  //     screen.height;

  //   const systemZoom = width / window.screen.availWidth;

  //   const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  //   const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  //   const newWindow = window.open(
  //     url,
  //     title,
  //     `width=${500 / systemZoom},height=${
  //       550 / systemZoom
  //     },top=${top},left=${left}`
  //   );

  //   newWindow?.focus();
  // };

  const handleButtonClick = (): void => {
    if (session) {
      router.push('/generate');
    } else {
      // popupCenter('/spotify-signin', 'Spotify Sign In');
      signIn('spotify', { callbackUrl: '/generate' }).catch(() => {
        toast.error('Failed to initiate log in with Spotify');
      });
    }
  };
  return (
    <>
      {status === 'loading' ? (
        <Skeleton className="rounded-lg w-24 h-10" />
      ) : (
        <Button
          className="rounded-[24px]"
          variant={'success'}
          onClick={handleButtonClick}
        >
          Start Generating
        </Button>
      )}
    </>
  );
};

export default CallToAction;

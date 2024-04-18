'use client';

import React from 'react';
import GenerateOption, { options } from './option';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  className?: string;
  itemClassName?: string;
}

const GenerateOptions: React.FC<Props> = ({ className, itemClassName }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleOptionSelect = (rerouteTo: string): void => {
    if (session) {
      router.push(`/generate/${rerouteTo}`);
    } else {
      signIn('spotify', { callbackUrl: `/generate/${rerouteTo}` }).catch(() => {
        toast.error('Failed to initiate log in with Spotify');
      });
    }
  };

  return (
    <div
      className={cn('w-full grid grid-cols-2 gap-2 px-8 md:px-0', className)}
    >
      {options.map((option, index) => {
        if (status === 'loading') {
          return <Skeleton key={index} className="w-full h-24" />;
        }
        return (
          <div
            key={index}
            className={cn(
              'cursor-pointer bg-secondary rounded-lg px-4 py-2 hover:bg-secondary/50 transition-all duration-500 ease-in-out h-auto',
              itemClassName
            )}
            onClick={() => {
              handleOptionSelect(
                option.label.toLowerCase().split(' ').join('-')
              );
            }}
          >
            <GenerateOption key={index} {...option} />
          </div>
        );
      })}
    </div>
  );
};

export default GenerateOptions;

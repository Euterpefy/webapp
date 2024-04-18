import React from 'react';
import GenerateOptions from '@/components/generate/options';
import { cn } from '@/lib/utils';
import { rubikFont } from '@/styles/fonts';

const GeneratePage = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <div
        className={cn('text-3xl font-bold text-center', rubikFont.className)}
      >
        Playlist customizers
      </div>
      <div className="max-w-[1024px] px-8">
        <GenerateOptions className="grid-cols-1" itemClassName="hover:py-4" />
      </div>
    </div>
  );
};

export default GeneratePage;

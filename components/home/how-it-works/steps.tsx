import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { poppinsFont } from '@/styles/fonts';
import React from 'react';

interface StepProps {
  label: React.ReactNode;
  description: React.ReactNode;
  className?: string;
}

const Step: React.FC<StepProps> = ({ label, description, className }) => (
  <div className={cn('flex flex-col', className)}>
    <div className={cn('font-medium text-lg text-info', poppinsFont.className)}>
      {label}
    </div>
    <div className="text-md text-foreground/70">{description}</div>
  </div>
);

const Steps = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-8 px-8 py-6 w-full max-w-[1024px]">
      {stepsData.map((step, index) => (
        <Step
          key={index}
          label={step.label}
          description={step.description}
          className={index % 2 === 1 ? 'items-end' : ''}
        />
      ))}
    </div>
  );
};

export default Steps;

const stepsData: StepProps[] = [
  {
    label: (
      <div className="flex items-center gap-2">
        <span>1. Login with Spotify</span>
        <Icons.spotify />
      </div>
    ),
    description: 'Unlocks your music library for a personalized playlist.',
  },
  {
    label: '2. Pick Your Seeds',
    description:
      'Choose genres, artists, or songs as preferences for your playlist.',
  },
  {
    label: '3. Fine-tune the Vibe',
    description: 'Adjust energy, mood, and popularity to match your taste.',
  },
  {
    label: '4. Get Your Perfect Playlist',
    description: `We'll craft a playlist just for you - listen, edit, and enjoy!`,
  },
];

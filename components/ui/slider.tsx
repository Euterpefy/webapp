'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  xs: {
    track: 'h-1',
    thumb: 'h-3 w-3', // Example size, adjust based on design
    thumbBorder: 'border-2',
    focusRing: 'focus-visible:ring-2',
  },
  sm: {
    track: 'h-1.5',
    thumb: 'h-4 w-4', // Example size, adjust based on design
    thumbBorder: 'border-2',
    focusRing: 'focus-visible:ring-2',
  },
  md: {
    track: 'h-2',
    thumb: 'h-5 w-5', // Example size, adjust based on design
    thumbBorder: 'border-2',
    focusRing: 'focus-visible:ring-2',
  },
  lg: {
    track: 'h-2.5',
    thumb: 'h-6 w-6', // Example size, adjust based on design
    thumbBorder: 'border-2',
    focusRing: 'focus-visible:ring-2',
  },
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, size = 'md', ...props }, ref) => {
  const { track, thumb, thumbBorder, focusRing } = sizeClasses[size];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          'relative w-full grow overflow-hidden rounded-full bg-secondary',
          track
        )}
      >
        <SliderPrimitive.Range className="absolute h-full bg-primary/60" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'block rounded-full border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          thumb,
          thumbBorder,
          focusRing
        )}
      />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, size = 'md', ...props }, ref) => {
  const { track, thumb, thumbBorder, focusRing } = sizeClasses[size];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          'relative w-full grow overflow-hidden rounded-full bg-secondary',
          track
        )}
      >
        <SliderPrimitive.Range className="absolute h-full bg-primary/60" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'block rounded-full border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          thumb,
          thumbBorder,
          focusRing
        )}
      />
      <SliderPrimitive.Thumb
        className={cn(
          'block rounded-full border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          thumb,
          thumbBorder,
          focusRing
        )}
      />
    </SliderPrimitive.Root>
  );
});
RangeSlider.displayName = SliderPrimitive.Root.displayName;

export { Slider, RangeSlider };

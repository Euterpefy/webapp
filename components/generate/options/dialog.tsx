'use client';

import React from 'react';
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '@/components/ui/responsive-modal';
import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import GenerateOptions from '.';

const OptionsDialogButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, ...props }, ref): JSX.Element => {
    const [open, setOpen] = React.useState(false);

    return (
      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalTrigger
          className={cn(
            buttonVariants({
              variant: variant ?? 'warning',
              size: size ?? 'default',
            }),
            'flex items-center gap-2 rounded-[24px]',
            className
          )}
          ref={ref}
          {...props}
        >
          <Icons.spotify />
          {children}
        </ResponsiveModalTrigger>
        <ResponsiveModalContent>
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>
              Spotify Playlist customizers
            </ResponsiveModalTitle>
            <ResponsiveModalDescription className="flex flex-col gap-2">
              How would you like to customize your playlists
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <GenerateOptions />
          <ResponsiveModalFooter>
            <div className="flex items-center justify-end gap-2">
              <ResponsiveModalClose
                className={cn(
                  buttonVariants({ variant: 'destructive', size: 'sm' }),
                  'flex items-center justify-between gap-2'
                )}
              >
                Cancel
              </ResponsiveModalClose>
            </div>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    );
  }
);

OptionsDialogButton.displayName = 'GeneratorOptionsDialogButton';

export default OptionsDialogButton;

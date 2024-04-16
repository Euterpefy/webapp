import { cn } from '@/lib/utils';
import React from 'react';

const DisplayName: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'text-md font-medium text-ellipsis line-clamp-2',
        className
      )}
    >
      {children}
    </span>
  );
};

const DisplayFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'text-sm text-foreground/50 capitalize text-ellipsis line-clamp-2 items-center',
        className
      )}
    >
      {children}
    </span>
  );
};

export { DisplayName, DisplayFooter };

'use client';
import React from 'react';
import { Button, type ButtonProps } from '../ui/button';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary';
}

const LogoutButton: React.FC<LogoutButtonProps & ButtonProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  return (
    <Button
      onClick={() => {
        signOut().catch(() => {
          toast.error('Failed to log out');
        });
      }}
      variant={variant ?? 'outline'}
      className={cn(className)}
      {...props}
    >
      {children ?? 'Logout'}
    </Button>
  );
};

export default LogoutButton;

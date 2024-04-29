'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import LogoutButton from './logout-button';
import LoginButton from './login-button';
import { Skeleton } from '../ui/skeleton';

const AuthButton = (): JSX.Element => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === 'loading' ? (
        <Skeleton className="rounded-lg w-24 h-10" />
      ) : session ? (
        <LogoutButton />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default AuthButton;

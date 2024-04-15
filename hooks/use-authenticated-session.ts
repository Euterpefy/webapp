import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

export function useAuthenticatedSession() {
  const { data, status, update } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      if (data && data.expires && data.token) {
        const sessionExpired = new Date(data.token.expires_at) < new Date();
        if (sessionExpired) {
          signIn('spotify');
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [data]);

  return { data, status, update };
}

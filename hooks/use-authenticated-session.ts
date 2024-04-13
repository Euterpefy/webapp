import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

export function useAuthenticatedSession() {
  const { data, status, update } = useSession();

  useEffect(() => {
    if (data && data.expires) {
      const sessionExpired = new Date(data.expires) < new Date();
      if (sessionExpired) {
        // Session has expired
        console.log('Session expired. Refreshing...');
        signIn(data.user.provider); // You can customize this as needed
      }
    }
  }, [data]);

  return { data, status, update };
}

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

/**
 * A custom hook that manages an authenticated session and renews it if it expires.
 * @returns An object containing the session data, session status, and a function to update the session.
 */
export function useAuthenticatedSession(): {
  data: ReturnType<typeof useSession>["data"];
  status: ReturnType<typeof useSession>["status"];
  update: ReturnType<typeof useSession>["update"];
} {
  const { data, status, update } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.expires && data.token) {
        const sessionExpired = new Date(data.token.expires_at) < new Date();
        if (sessionExpired) {
          signIn("spotify").catch((error) => {
            console.error("Failed to sign in", error);
          });
        }
      }
    }, 1000); // Check every second

    return () => {
      clearInterval(interval);
    }; // Clean up the interval on component unmount
  }, [data]);

  return { data, status, update };
}

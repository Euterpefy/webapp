/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

import { refreshAccessToken } from '@/api/spotify/auth';
import {
  AUTH_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from '@/config/spotify-api';
import type { SessionToken } from '@/types/next-auth';
import type { User } from '@/types/spotify/user';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes

const handler = NextAuth({
  secret: AUTH_SECRET,
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60,
  },
  providers: [
    SpotifyProvider({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'user-top-read,user-read-email,user-read-private,playlist-modify-public,playlist-modify-private,playlist-read-private,playlist-read-collaborative,user-follow-read',
          show_dialog: 'true',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        if (token.account) {
          session.token = token.account as SessionToken;
        } else {
          session.token = undefined;
        }
        if (token.profile) {
          session.user = token.profile as User;
        }
      }

      return session;
    },
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    async jwt({ token, user, account, profile }) {
      if (token.account) {
        const now = Date.now();
        const oldTokenAccount = token.account as SessionToken;
        if (oldTokenAccount.expires_at && now > oldTokenAccount.expires_at) {
          const refreshedToken = await refreshAccessToken(oldTokenAccount);
          token.account = {
            ...oldTokenAccount,
            access_token: refreshedToken.access_token,
            expires_at: refreshedToken.expires_at,
            refresh_token: refreshedToken.refresh_token,
          };
        }
      } else if (account) {
        token.account = account;
      }

      if (profile) {
        token.profile = profile;
      }
      return token;
    },
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    async signIn({ user, account, profile }) {
      // Make an HTTP request to your API backend
      if (account) {
        return true;
      } else {
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };

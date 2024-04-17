/* eslint-disable @typescript-eslint/no-unused-vars */

import { refreshAccessToken } from '@/lib/api/spotify/auth';

import type { SessionToken } from '@/types/next-auth';
import type { User } from '@/types/spotify/user';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

// https://developer.spotify.com/documentation/web-api/concepts/scopes

const AUTH_SECRET = process.env.AUTH_SECRET ?? '';
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '';
const SPOTIFY_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET ?? '';

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
    async signIn({ user, account, profile }) {
      if (account) {
        return true;
      } else {
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };

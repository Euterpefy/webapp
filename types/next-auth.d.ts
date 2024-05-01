import { type User } from "./spotify";

declare module "next-auth" {
  interface Session {
    token?: SessionToken;
    user?: User;
    expires?: string;
  }
}

export interface SessionToken {
  providerAccountId: string;
  token_type: string;
  scope: string;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

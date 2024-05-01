"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const SpotifySigninPage = (): JSX.Element => {
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (!(status === "loading") && !session)
      void signIn("spotify", { redirect: false });
    if (session) window.close();
  }, [session, status]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    ></div>
  );
};

export default SpotifySigninPage;

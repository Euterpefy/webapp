"use client";
import React from "react";
import { Button } from "../../ui/button";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Skeleton } from "../../ui/skeleton";
import { useRouter } from "next/navigation";
import OptionsDialogButton from "@/components/generate/options/dialog";
import { Icons } from "@/components/icons";

const CallToAction = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleButtonClick = (rerouteTo: string): void => {
    if (session) {
      router.push(rerouteTo);
    } else {
      // popupCenter('/spotify-signin', 'Spotify Sign In');
      signIn("spotify", { callbackUrl: rerouteTo }).catch(() => {
        toast.error("Failed to initiate log in with Spotify");
      });
    }
  };

  return (
    <>
      {status === "loading" ? (
        <Skeleton className="rounded-lg w-24 h-10" />
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            className="rounded-[24px] gap-2"
            variant={"success"}
            onClick={() => {
              handleButtonClick("/generate/quick-playlists");
            }}
          >
            <Icons.spotify />
            Quick Playlist Generating
          </Button>

          <OptionsDialogButton>
            Advanced Playlist Generators
          </OptionsDialogButton>
        </div>
      )}
    </>
  );
};

export default CallToAction;

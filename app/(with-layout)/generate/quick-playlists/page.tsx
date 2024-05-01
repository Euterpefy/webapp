"use client";

import GenerateSteps from "@/app/(with-layout)/generate/_components/stepper";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthenticatedSession } from "@/hooks/use-authenticated-session";
import { cn } from "@/lib/utils";
import { poppinsFont } from "@/styles/fonts";
import { signIn } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

const QuickGeneratePage = (): JSX.Element => {
  const { data: session, status } = useAuthenticatedSession();

  React.useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (status === "unauthenticated") {
      signIn("spotify", { callbackUrl: "/generate" }).catch(() => {
        toast.error(`Failed to initialize login session`);
      });
    }
  }, [session, status]);

  return (
    <div className="flex justify-center">
      <div className="mt-4 mx-4 w-full max-w-[1028px] flex flex-col gap-2">
        <div className={cn("text-3xl font-bold", poppinsFont.className)}>
          Quick Playlist Generator
        </div>
        {status === "loading" ? (
          <>
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-48" />
          </>
        ) : (
          <GenerateSteps />
        )}
      </div>
    </div>
  );
};

export default QuickGeneratePage;

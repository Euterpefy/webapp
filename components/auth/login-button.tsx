"use client";
import React from "react";

import { signIn } from "next-auth/react";
import { Button, type ButtonProps } from "../ui/button";
import AnimatedButton from "../motions/animated-button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LoginButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "secondary";
  animated?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps & ButtonProps> = ({
  children,
  className,
  variant,
  animated = false,
  ...props
}): JSX.Element => {
  const ButtonComp = animated ? AnimatedButton : Button;
  return (
    <ButtonComp
      onClick={() => {
        signIn("spotify", { callbackUrl: "/" }).catch(() => {
          toast.error("Failed to initiate log in with Spotify");
        });
      }}
      variant={variant ?? "default"}
      className={cn("", className)}
      {...props}
    >
      {children ?? "Login with Spotify"}
    </ButtonComp>
  );
};

export default LoginButton;

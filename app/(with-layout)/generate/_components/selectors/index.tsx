import React from "react";
import { cn } from "@/lib/utils";

export interface SeedSelectorProps {
  accessToken: string | undefined;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  totalSeeds: number;
}

export interface ItemsSelectorProps<T> {
  options: T[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  totalSeeds: number;
}

interface SelectorItemProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  selectable: boolean;
}

export const SelectorItem: React.FC<SelectorItemProps> = ({
  selected,
  children,
  onClick,
  selectable,
}): JSX.Element => {
  return (
    <div
      className={cn(
        "rounded-[12px] px-2 py-1 text-sm border cursor-pointer",
        selected && "bg-primary text-primary-foreground",
        !selectable && "cursor-not-allowed",
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

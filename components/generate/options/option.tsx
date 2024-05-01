import React from "react";

export const options: OptionProps[] = [
  {
    icon: "🚀",
    label: "Quick Playlists",
    description:
      "Rapidly generate playlists by selecting your preferred genres, artists, or tracks. Perfect for when you want a new playlist without fuss.",
  },
  {
    icon: "💫",
    label: "Mood Tuner",
    description:
      "Dive deeper and customize playlists to match your mood with advanced controls for loudness, danceability, popularity, and more.",
  },
  {
    icon: "❤️",
    label: "Favorites Mixer",
    description:
      "Create playlists from your top genres, tracks, and artists, and refine them further with fine-tuned adjustments to perfectly suit your taste.",
  },
  // {
  //   icon: '🔍',
  //   label: 'Discovery Composer',
  //   description:
  //     'Search and select artists and tracks to discover new music, then fine-tune your playlist to get the perfect sound.',
  // },
];

interface OptionProps {
  icon?: React.ReactNode;
  label: string;
  description?: React.ReactNode;
}

const GenerateOption: React.FC<OptionProps> = ({
  label,
  description,
  icon,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-md font-medium capitalize text-info flex items-center justify-between">
        <span>{label}</span>
        <span>{icon}</span>
      </p>
      <span className="text-xs text-foreground/70">{description}</span>
    </div>
  );
};

export default GenerateOption;

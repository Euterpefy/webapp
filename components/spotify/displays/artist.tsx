import React from "react";
import type { Artist } from "@/types/spotify/artist";
import Image from "next/image";
import { DisplayFooter, DisplayName } from ".";

const DisplayArtist: React.FC<{ artist: Artist }> = ({ artist }) => {
  const imageUrl = artist.images[0]?.url ?? "/spotify/default-cover.jpg";
  return (
    <div
      key={artist.id}
      className="flex flex-col gap-2 cursor-pointer px-4 py-2 hover:bg-secondary rounded-lg"
    >
      <div className="w-full">
        <Image
          src={imageUrl}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", objectFit: "cover" }} // optional
          className="rounded-full aspect-square"
        />
      </div>
      <div className="flex flex-col gap-1 items-start font-medium">
        <DisplayName>{artist.name}</DisplayName>
        <DisplayFooter>{artist.name}</DisplayFooter>
      </div>
    </div>
  );
};

export default DisplayArtist;

import React from "react";
import type { Playlist } from "@/types/spotify/playlist";
import Image from "next/image";
import { DisplayFooter, DisplayName } from ".";

const DisplayPlaylist: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
  const imageUrl = playlist.images[0]?.url ?? "/spotify/default-cover.jpg";
  return (
    <div
      key={playlist.id}
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
          className="rounded-md aspect-square"
        />
      </div>
      <div className="flex flex-col gap-1 items-start font-medium">
        <DisplayName>{playlist.name}</DisplayName>
        <DisplayFooter>By {playlist.owner.display_name}</DisplayFooter>
      </div>
    </div>
  );
};

export default DisplayPlaylist;

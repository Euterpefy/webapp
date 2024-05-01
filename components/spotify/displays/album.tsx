import React from "react";
import Image from "next/image";
import type { Album } from "@/types/spotify/album";
import { DisplayFooter, DisplayName } from ".";

const DisplayAlbum: React.FC<{ album: Album }> = ({ album }) => {
  const imageUrl = album.images[0]?.url ?? "/spotify/default-cover.jpg";
  return (
    <div
      key={album.id}
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
        <DisplayName>{album.name}</DisplayName>
        <DisplayFooter>
          {album.release_date.slice(0, 4)}
          <span className="mx-1">•</span>
          {album.artists.map((a) => a.name).join(", ")}
        </DisplayFooter>
      </div>
    </div>
  );
};

export default DisplayAlbum;

import Image from "next/image";
import React from "react";

interface Props {
  images: string[];
  size?: "sm" | "md" | "lg";
}

const CoverImage: React.FC<Props> = ({ images, size }) => {
  const getContainerSize = (): string => {
    switch (size) {
      case "sm":
        return "h-8 w-8";
      case "md":
        return "h-12 w-12";
      case "lg":
        return "h-16 w-16";
      default:
        return "h-12 w-12";
    }
  };

  const getImageSize = (): { height: number; width: number } => {
    switch (size) {
      case "sm":
        return { height: 25, width: 25 };
      case "md":
        return { height: 50, width: 50 };
      case "lg":
        return { height: 75, width: 75 };
      default:
        return { height: 50, width: 50 };
    }
  };

  return images.length >= 4 ? (
    <div
      className={`${getContainerSize()} grid grid-cols-2 grid-rows-2 gap-0.5`}
    >
      {images.slice(0, 4).map((img, index) => (
        <Image
          key={index}
          src={img}
          alt="Track cover"
          className={"h-full w-full object-cover"}
          priority={true}
          {...getImageSize()}
        />
      ))}
    </div>
  ) : images.length >= 1 ? (
    <div className={size ?? getContainerSize()}>
      <Image
        src={images[0]}
        alt="Track cover"
        className="h-full w-full object-cover"
        priority={true}
        {...getImageSize()}
      />
    </div>
  ) : null;
};

export default CoverImage;

import React from 'react';
import { chunkArray, cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { PagedResponse } from '@/types/spotify/pagination';

interface DisplayBoxProps {
  children: React.ReactNode;
  className?: string;
}

const DisplayBox: React.FC<DisplayBoxProps> = ({ children, className }) => {
  return (
    <Carousel className={cn('w-full flex flex-col gap-2', className)}>
      {children}
    </Carousel>
  );
};

interface DisplayBoxHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const DisplayBoxHeader: React.FC<DisplayBoxHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {children}
    </div>
  );
};

interface DisplayBoxLabelProps {
  children: React.ReactNode;
  className?: string;
}

const DisplayBoxLabel: React.FC<DisplayBoxLabelProps> = ({
  children,
  className,
}) => {
  return <div className={cn('text-xl font-bold', className)}>{children}</div>;
};

interface DisplayBoxPaginationProps {
  className?: string;
}
const DisplayBoxPagination: React.FC<DisplayBoxPaginationProps> = ({
  className,
}) => {
  return (
    <div className={cn('flex flex-items gap-1', className)}>
      <CarouselPrevious className="relative -right-0 top-0 left-0 -translate-y-0" />
      <CarouselNext className="relative -right-0 top-0 left-0 -translate-y-0" />
    </div>
  );
};

interface DisplayBoxItemsProps<T> {
  pagedItems: PagedResponse<T>;
  displayItem: (item: T) => React.ReactNode;
  itemsPerCol?: number;
  className?: string;
  itemClassName?: string;
}

const DisplayBoxItems = <T,>({
  pagedItems,
  displayItem,
  itemsPerCol = 5,
  className,
  itemClassName,
}: DisplayBoxItemsProps<T>): JSX.Element => {
  const { items } = pagedItems;
  const chunks = chunkArray(items, itemsPerCol);

  return (
    <CarouselContent className={cn(className)}>
      {chunks.map((chunk, index) => (
        <CarouselItem
          key={index}
          className={cn(
            'flex w-fit flex-col items-start gap-2 basis-1/2 md:basis-1/3 lg:basis-1/4',
            itemClassName
          )}
        >
          {chunk.map((item, j) => (
            <div key={j}>{displayItem(item)}</div>
          ))}
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

export {
  DisplayBox,
  DisplayBoxHeader,
  DisplayBoxLabel,
  DisplayBoxPagination,
  DisplayBoxItems,
};

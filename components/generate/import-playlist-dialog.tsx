import React from 'react';
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '@/components/ui/responsive-modal';
import { Button } from '../ui/button';

const ImportPlaylistDialog = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalTrigger>
        <Button size={'sm'} variant={'success'}>
          Import to Spotify
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Import To Spotify</ResponsiveModalTitle>
          <ResponsiveModalDescription className="flex flex-col gap-2">
            Enter details for your playlist
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <ResponsiveModalFooter>
          <ResponsiveModalClose className="flex items-center gap-2">
            <Button
              size={'sm'}
              variant={'secondary'}
              className="px-2 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              size={'sm'}
              variant={'destructive'}
              className="px-2 rounded-lg"
              onClick={() => {}}
            >
              Import
            </Button>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default ImportPlaylistDialog;

import React from "react";
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Button, buttonVariants } from "../../../../components/ui/button";
import type { NewPlaylist } from "@/types/spotify/playlist";
import NewPlaylistForm from "../../../../components/forms/create-playlist";
import { toast } from "sonner";
import { useAuthenticatedSession } from "@/hooks/use-authenticated-session";
import { addPlaylistItems, createPlaylist } from "@/lib/api/spotify/playlist";
import ImportToExistingPlaylist from "../../../../components/forms/import-to-existing";
import { Icons } from "../../../../components/icons";
import { cn } from "@/lib/utils";

interface Props {
  trackIds: string[];
}

const ImportPlaylistDialog: React.FC<Props> = ({ trackIds }) => {
  const [open, setOpen] = React.useState(false);

  const [importOption, setImportOption] = React.useState<"" | "new" | "add">(
    "",
  );

  const { data: session, status } = useAuthenticatedSession();

  const handlePlaylistCreate = async (
    newPlaylist: NewPlaylist,
  ): Promise<void> => {
    try {
      if (status === "loading") {
        return;
      }
      if (!session?.token || !session?.user) {
        return;
      }

      // Create the playlist
      const playlist = await createPlaylist(
        session.token.access_token,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        session.user?.id,
        newPlaylist,
      );

      if (!playlist?.id) {
        throw new Error("Failed to create playlist");
      }

      // // Add tracks to the playlist
      try {
        await addPlaylistItems(
          session.token.access_token,
          playlist.id,
          trackIds,
        );
        setOpen(false);
        setImportOption("");
        toast.success("Playlist created and tracks added successfully!");
      } catch (e) {
        toast.error(`Failed to add items to playlist`);
      }
    } catch (error) {
      // console.error('Error in creating playlist:', error);
      toast.error(`Failed to create new playlist`);
    }
  };

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalTrigger
        className={cn(
          buttonVariants({ variant: "success", size: "sm" }),
          "flex items-center gap-2",
        )}
      >
        <Icons.spotify />
        Import to Spotify
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Import To Spotify</ResponsiveModalTitle>
          <ResponsiveModalDescription className="flex flex-col gap-2">
            {importOption === "" && "How would you like to import?"}
            {importOption === "new" && "Enter details for you new playlist"}
            {importOption === "add" && "Choose a playlist..."}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <div className="px-4 md:px-0">
          {importOption === "" && (
            <div className="flex items-center gap-2 justify-center">
              <div
                className="bg-primary text-primary-foreground rounded-lg p-4 cursor-pointer"
                onClick={() => {
                  setImportOption("new");
                }}
              >
                Create new playlist
              </div>
              <div
                className="bg-warning text-warning-foreground rounded-lg p-4 cursor-pointer"
                onClick={() => {
                  setImportOption("add");
                }}
              >
                Import to an existing playlist
              </div>
            </div>
          )}
          {importOption === "new" && (
            <NewPlaylistForm
              onSave={(newPlaylist) => {
                handlePlaylistCreate(newPlaylist).catch(() => {
                  toast.error(`Failed to create new playlist`);
                });
              }}
            />
          )}
          {importOption === "add" && (
            <ImportToExistingPlaylist trackIds={trackIds} />
          )}
        </div>
        <ResponsiveModalFooter>
          <div className="flex items-center justify-between gap-2">
            {importOption !== "" && (
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => {
                  setImportOption("");
                }}
              >
                Back
              </Button>
            )}
            <ResponsiveModalClose
              className={cn(
                buttonVariants({ variant: "destructive", size: "sm" }),
                "flex items-center justify-between gap-2",
              )}
            >
              Cancel
            </ResponsiveModalClose>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default ImportPlaylistDialog;

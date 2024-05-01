import React, { useState } from "react";
import { Input } from "../ui/input"; // Adjust import paths as necessary
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import type { NewPlaylist } from "@/types/spotify/playlist";
import { Label } from "../ui/label";

interface NewPlaylistFormProps {
  onSave: (playlist: NewPlaylist) => void;
}

const NewPlaylistForm: React.FC<NewPlaylistFormProps> = ({
  onSave,
}): JSX.Element => {
  const [playlist, setPlaylist] = useState<NewPlaylist>({
    name: "",
    public: false,
    collaborative: false,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setPlaylist({ ...playlist, [name]: value });
  };

  const handleSwitchChange = (name: keyof NewPlaylist): void => {
    setPlaylist({ ...playlist, [name]: !playlist[name] });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave(playlist);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input
          name="name"
          placeholder="Playlist Name"
          value={playlist.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          placeholder="Playlist Description"
          value={playlist.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label>Public</Label>
        <Switch
          checked={playlist.public}
          onClick={() => {
            handleSwitchChange("public");
          }}
          size="xs"
        />
      </div>
      <div className="flex items-center gap-2">
        <Label>Collaborative</Label>
        <Switch
          checked={playlist.collaborative}
          onClick={() => {
            handleSwitchChange("collaborative");
          }}
          size="xs"
        />
      </div>

      <Button type="submit" size="sm" variant="success">
        Create Playlist
      </Button>
    </form>
  );
};

export default NewPlaylistForm;

import { useState, useRef } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { usersService } from "@/features/users/api/users.service";
import { toast } from "sonner";
import { User as UserIcon, Loader2, Trash2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { user, setUser } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const updatedUser = await usersService.uploadFile(
        file,
        "/me/profile-image",
        "PATCH"
      );

      setUser(updatedUser);
      toast.success("Profile picture updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile picture");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      setIsUploading(true);
      const updatedUser = await usersService.deleteFile("/me/profile-image");
      setUser(updatedUser);
      toast.success("Profile picture removed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Manage your profile avatar.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="relative">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-xl ring-2 ring-border bg-muted flex items-center justify-center">
              {user.profile_url ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${user.profile_url}`}
                  alt={user.full_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserIcon className="h-12 w-12 text-muted-foreground" />
              )}

              {isUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 w-full justify-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              disabled={isUploading}
            >
              <Camera className="mr-2 h-4 w-4" />
              Change
            </Button>
            {user.profile_url && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDeleteImage}
                disabled={isUploading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />

          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold">{user.full_name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="pt-2">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

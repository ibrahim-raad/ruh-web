import { Button } from "@/components/ui/button";
import type { User } from "@/features/users/types/user.types";
import { User as UserIcon } from "lucide-react";

interface UserProfileProps {
  user: User;
  onClick?: () => void;
}

export function UserProfile({ user, onClick }: UserProfileProps) {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 px-2 hover:bg-accent"
      onClick={onClick}
    >
      {user.profile_url ? (
        <img
          src={`${import.meta.env.VITE_API_URL}${user.profile_url}`}
          alt={user.full_name}
          className="h-8 w-8 rounded-full object-cover border border-border"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-border">
          <UserIcon className="h-4 w-4 text-primary" />
        </div>
      )}
      <span className="text-sm font-medium hidden md:inline">
        {user.full_name}
      </span>
    </Button>
  );
}

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

// TODO: Replace with actual user type from auth context
type UserData = {
  name: string;
  email: string;
  avatar: string | null;
};

interface UserProfileProps {
  user: UserData;
  onClick?: () => void;
}

export function UserProfile({ user, onClick }: UserProfileProps) {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 px-2 hover:bg-accent"
      onClick={onClick}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="h-8 w-8 rounded-full object-cover border border-border"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-border">
          <User className="h-4 w-4 text-primary" />
        </div>
      )}
      <span className="text-sm font-medium hidden md:inline">{user.name}</span>
    </Button>
  );
}

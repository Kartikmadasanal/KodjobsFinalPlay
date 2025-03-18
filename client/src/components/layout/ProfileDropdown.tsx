import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { calculateAge } from "@/lib/utils";
import UpdateProfileDialog from "./UpdateProfileDialog";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();

  if (!user) return null;
console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span>Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col items-start gap-1">
          <span className="font-medium">{user.username}</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col items-start gap-1">
          <span className="text-sm">Age: {calculateAge(user.dateOfBirth)} years old</span>
          <span className="text-sm">Phone: {user.phoneNumber}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <UpdateProfileDialog />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-500">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
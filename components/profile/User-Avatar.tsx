import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function UserAvatar({ avatar, username }: { avatar: string, username: string }) {
    return (
        /** Custom Avatar with CN */
        <Avatar className={cn("h-25 w-25 rounded-full")}>
            <AvatarImage
                src={avatar}
                alt={`${username}'s avatar`}
                width={60}
                height={60}
                className={cn("transition duration-200 ease-in-out group-hover:brightness-75")}
                />
                <AvatarFallback className="text-lg sm:text-xl font-semibold">
                    {username.charAt(0).toUpperCase()}
                </AvatarFallback>
        </Avatar>
    )
}
import Image from "next/image";
import { MAPIUser } from "@/types/auth0/mapi_user";

type FriendCardProps = {
  friend?: MAPIUser;
};

export default function FriendCard({ friend }: FriendCardProps) {
  return (
    <div className="h-25 flex flex-row items-center">
      <div className="flex-none">
        <Image
          src={friend?.picture ?? "/profile.png"}
          alt={friend?.name ?? ""}
          width={0}
          height={0}
          priority
          unoptimized
          className="h-20 w-20 p-[5px] rounded-full object-contain"
        />
      </div>
      <div className="h-full flex flex-col pl-3">
        <p className="text-md flex-none pt-2 pb-1">{friend?.name}</p>
        <p className="text-gray-500 !text-sm/4 line-clamp-2">Bob likes food</p>
        <p className="text-gray-500 text-xs flex-none mt-auto pb-1">
          42 reviews
        </p>
      </div>
      <div className="ml-auto flex-none pr-4 pl-1">
        <button className="rounded-md bg-gray-100 h-fit px-2 cursor-pointer hover:bg-gray-300 border-1 border-gray-300">
          Remove Friend
        </button>
      </div>
    </div>
  );
}

import Image from "next/image";
import { MAPIUser } from "@/types/auth0/mapi_user";

type SentInviteProps = {
  friend?: MAPIUser;
};

export default function SentInviteCard({ friend }: SentInviteProps) {
  return (
    <div className="h-25 flex flex-row items-center">
      <div className="flex-none">
        <Image
          src={friend?.picture ?? ""}
          alt={friend?.name ?? ""}
          width={20}
          height={20}
          priority
          className="h-20 w-20 p-[5px] rounded-full"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="h-full flex flex-col pl-3">
        <p className="text-md flex-none pt-2 pb-1">{friend?.name}</p>
        <p className="text-gray-500 !text-sm/4 line-clamp-2">Bob likes food</p>
        <p className="text-gray-500 text-xs flex-none mt-auto pb-1">
          Sent 1 day ago
        </p>
      </div>
      <div className="ml-auto flex-none pr-4 pl-1">
        <div className="flex gap-3">
          <button className="rounded-md bg-gray-100 h-fit px-2 cursor-pointer hover:bg-gray-300 border-1 border-gray-300">
            Cancel
          </button>
          <button className="rounded-md bg-gray-100 h-fit px-2 cursor-pointer hover:bg-gray-300 border-1 border-gray-300">
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}

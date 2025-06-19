"use client";

import postImg from "@/assets/images/img1.jpg";
import pfp from "@/assets/images/Avatar.png";
import Image from "next/image";
import { Button } from "../ui/Button";
import { PostType, UserType } from "@/types/mainTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PostCardProps = Partial<PostType> & { users?: Partial<UserType> };

const PostCard = ({ content, users }: PostCardProps) => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col overflow-hidden">
      {/* post header  */}
      <div className="flex items-start gap-2">
        <Image
          onClick={() => router.push(`/${users?.username}`)}
          alt={"pfp"}
          src={pfp}
          width={40}
          className="cursor-pointer hover:opacity-85"
        />
        <div className="flex flex-col gap-1">
          {/* name and grp  */}
          <div className="flex items-center gap-3">
            <div className="text-surface flex gap-1 text-sm font-semibold">
              {users?.email}
              <i className="fi fi-sr-check-circle text-link"></i>
            </div>

            <p className="text-secondary text-sm">
              {"From "}
              <span className="font-semibold">UN Women</span>
              {" • 4h"}
            </p>
            <i className="fi fi-rr-menu-dots text-surface ml-auto text-lg"></i>
          </div>
          {/* // description  */}
          <p className="text-surface text-sm font-light">{content}</p>
          {/* post image  */}
          <Image alt={"post-img"} src={postImg} className="mt-1 rounded-xl" />
          <div className="mt-2 flex items-center space-x-5">
            <div className="text-secondary flex items-center gap-5">
              <i className="fi fi-tr-heart text-xl"></i>
              <i className="fi fi-tr-beacon text-xl"></i>
              <i className="fi fi-tr-paper-plane-top text-xl"></i>
            </div>
            <Button
              size={"sm"}
              className="bg-primary ml-auto flex items-center gap-1 px-3 text-sm font-bold"
            >
              Donate <i className="fi fi-sc-hand-holding-heart text-lg"></i>
            </Button>
          </div>

          {/* comment  */}

          <div className="flex space-x-2">
            <div className="flex gap-1">
              <Image alt={"pfp"} src={pfp} width={25} />
              <h2 className="text-surface text-sm font-medium">Rajapassa</h2>
            </div>
            <span className="text-secondary text-sm">
              Meka set na. wena ekak krmu...
            </span>
          </div>
          <span className="text-secondary mt-1 text-sm font-semibold">
            View all 1.4k comments
          </span>
          <div className="bg-input/40 flex h-9 w-full items-center rounded-full">
            <input
              type="text"
              className="placeholder:text-secondary text-surface/70 w-full flex-1 pl-3 outline-0 placeholder:text-sm"
              placeholder="Write a comment"
            />
            <i className="fi fi-sr-grin text-secondary pr-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

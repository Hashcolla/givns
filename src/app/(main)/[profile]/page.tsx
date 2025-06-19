import { checkProfileExists } from "@/actions/profileActions";
import postImg from "@/assets/images/img1.jpg";
import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/main/PostCard";
import ProfilePic from "@/components/main/profile/ProfilePic";
import EditProfileButton from "@/components/main/profile/EditProfileButton";
import { notFound } from "next/navigation";
import { isThisMe } from "@/actions/serverActions";
import { Button } from "@/components/ui/Button";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ profile: string }>;
}) => {
  const { profile } = await params;

  const { data, error } = await checkProfileExists(profile);

  if (error) {
    notFound();
  }

  const isMe = await isThisMe(data?.email);
  console.log("isMe", isMe);

  return (
    <div className="flex w-full flex-col">
      <Image
        src={postImg}
        alt="cover-pic"
        className="h-[250px] object-cover"
        height={0}
      />
      <div className="mx-5 flex flex-col">
        <div className="flex flex-1 justify-between pt-2">
          <ProfilePic />
          <div>
            {isMe ? (
              <EditProfileButton />
            ) : (
              <Button className="bg-primary">Follow</Button>
            )}
          </div>
        </div>
        <h1 className="text-foreground text-xl font-semibold">
          {data?.full_name}
        </h1>

        <span className="text-primary/80 text-sm font-medium">
          @{data?.username}
        </span>
        <div className="mt-3 flex gap-5">
          <p className="text-secondary text-sm font-light">
            <span className="text-foreground font-medium">11k</span> Followers
          </p>
          <p className="text-secondary text-sm font-light">
            <span className="text-foreground font-medium">11k</span> Followings
          </p>
        </div>
        <p className="text-surface/80 mt-2 text-sm font-light">{data?.bio}</p>
        <div className="mt-3 flex gap-5 text-sm">
          <p className="text-secondary flex items-center gap-1 font-light">
            <i className="fi fi-rr-calendar-lines cursor-pointer"></i>
            Joined on
            <span className="text-surface font-medium">11.11.1111</span>
          </p>
          <p className="text-secondary flex items-center gap-1 font-light">
            <i className="fi fi-ss-link"></i>
            <span>{data.facebook}</span>
          </p>
        </div>
        <div className="mt-1 flex gap-1 text-sm">
          <i className="fi fi-rr-marker text-secondary cursor-pointer"></i>
          <span className="text-secondary">galla, matara</span>
        </div>
        <Tabs defaultValue={"posts"} className="mt-5 w-full">
          <TabsList className="w-full bg-transparent">
            <TabsTrigger className="border-0 bg-transparent" value="posts">
              Posts
            </TabsTrigger>
            <TabsTrigger className="border-0 bg-transparent" value="Media">
              Media
            </TabsTrigger>
            <TabsTrigger className="border-0 bg-transparent" value="Donors">
              Donors
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <PostCard content="sdds" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;

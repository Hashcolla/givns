import { getPosts } from "@/actions/postActions";
import PostCard from "@/components/main/PostCard";
import React from "react";

const page = async () => {
  const { data } = await getPosts();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      {/* <RecentProjectsSlider /> */}

      {data &&
        data.length > 0 &&
        data.map((post, index) => (
          <div key={index}>
            <PostCard {...post} />
          </div>
        ))}
    </div>
  );
};

export default page;

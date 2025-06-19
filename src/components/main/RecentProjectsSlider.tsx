import React from "react";
import Link from "next/link";
import Image from "next/image";
import projectImg from "@/assets/images/img1.jpg"; // Replace with actual image path
import { Progress } from "../ui/progress";

const RecentProjectsSlider = () => {
  return (
    <div className="w-full space-y-5">
      <div className="flex justify-between">
        <h1 className="text-surface text-lg font-semibold">Urgent Projects</h1>
        <Link href={""}>See all</Link>
      </div>
      <RecentProjectsSliderList />
    </div>
  );
};

export default RecentProjectsSlider;

const RecentProjectsSliderList = () => {
  return (
    <div className="flex w-full gap-2 overflow-x-auto">
      <RecentProjectsSliderItem />
      <RecentProjectsSliderItem />
      <RecentProjectsSliderItem />
      <RecentProjectsSliderItem />
      <RecentProjectsSliderItem />
    </div>
  );
};

const RecentProjectsSliderItem = () => {
  return (
    <div className="border-input/50 hover:bg-card/40 flex min-w-[350px] cursor-pointer flex-col overflow-hidden rounded-xl border">
      <Image
        alt="project-img"
        src={projectImg}
        className="h-[170px] w-full object-cover"
      />
      <div className="space-y-3 px-3 py-3">
        {/* title and bookmark  */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl">Books For Poor Kids</h2>
            <p className="text-secondary text-light text-sm">
              by
              <span className="font-semibold">
                Live and Let Live Foundation
              </span>
              <i className="fi fi-sr-check-circle text-link"></i>
            </p>
          </div>
          <div className="bg-input/50 hover:bg-input flex size-12 cursor-pointer items-center justify-center rounded-full">
            <i className="fi fi-rr-bookmark text-surface text-lg"></i>
          </div>
        </div>

        {/* progress bar  */}
        <Progress className="h-1.5" value={80} />
        <div className="flex justify-between">
          <p className="text-secondary text-light text-sm">
            Raised <span className="font-semibold">$60,000 / $100,000</span>
          </p>
          <span className="text-secondary text-sm font-bold">2 days left</span>
        </div>
      </div>
    </div>
  );
};

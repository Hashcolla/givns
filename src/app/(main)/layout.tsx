import React, { ReactNode, Suspense } from "react";
import HomeHeader from "@/components/main/HomeHeader";
import HomePrimaryBar from "@/components/main/HomePrimaryBar";
import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HomeSideBar from "@/components/main/HomeSideBar";
import PopupModal from "@/components/popup-modal/PopupModal";
import { hasFilledOnboardingForm } from "@/actions/serverActions";

const HomeLayout = async ({
  children,
}: {
  children: ReactNode;
  navbar: ReactNode;
}) => {
  const client = await supabaseServer();

  const layoutCss =
    "mx-auto xl:w-[1280]  grid h-screen grid-cols-[auto_1fr_min(400px,30vw)] xl:grid-cols-[min(300px,30vw)_auto_min(400px,30vw)]  grid-rows-[90px_1fr] [grid-template-areas:'header_header_header''main_main_main']  md:[grid-template-areas:'header_header_header''primary-sidebar_main_main'] lg:[grid-template-areas:'header_header_header''primary-sidebar_main_sidebar']  md:grid-rows-[70px_1fr] ";

  const {
    data: { user },
  } = await client.auth.getUser();

  if (user) {
    const { data, error } = await hasFilledOnboardingForm();

    if (!data) {
      redirect("/onboarding");
    }

    console.log("User is authenticated:");
    return (
      <>
        <PopupModal>
          <div className={layoutCss}>
            <div className="header border-sidebar-border border-b [grid-area:header] md:h-auto">
              <HomeHeader />
            </div>
            <div className="border-sidebar-border hidden h-auto w-fit [grid-area:primary-sidebar] md:block md:border-r">
              <HomePrimaryBar />
            </div>
            <div className="main [grid-area:main] md:overflow-y-auto">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>
            <div className="border-sidebar-border hidden px-5 pt-10 [grid-area:sidebar] md:border-l lg:block">
              <HomeSideBar />
            </div>
          </div>
        </PopupModal>
      </>
    );
  } else {
    console.log("User is not authenticated");
    redirect("/auth");
  }
};

export default HomeLayout;

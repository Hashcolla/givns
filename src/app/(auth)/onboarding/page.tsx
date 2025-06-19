"use client";

import RegisterPageLayout from "@/components/auth/RegisterPageLayout";
import RegisterFormControls from "@/components/auth/RegisterFormControls";
import { useEffect, useRef, useState } from "react";
import { AuthImageComp } from "../auth/AuthPage";
import { motion } from "motion/react";
import { onboardingPages } from "./data";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FieldErrors } from "react-hook-form";
import { OnboardingFormValues } from "@/schema/onboardingSchema";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { SocialLinksFormValues } from "@/components/auth/onboarding/social-media-links/page";
import Logo from "@/components/ui/Logo";

const OnboardingPageLayout = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const numberOfPages = onboardingPages.length;
  const searchParams = useSearchParams();
  const router = useRouter();

  const { isLoading: isButtonLoading, setLoading } = useOnboardingStore(
    (state) => state,
  );

  const ref = useRef<(() => void) | null>(null);

  function pushParams() {
    const params = searchParams.get("page");
    if (params) {
      const paramPage = onboardingPages.find(
        (page) => page.pageName === params,
      );
      const pageId = paramPage?.id as number;
      console.log("page id: ", pageId);
      setCurrentPage(pageId - 1);
    } else {
      router.push("?page=account-type");
    }
  }

  const onError = (
    error:
      | FieldErrors<OnboardingFormValues>
      | FieldErrors<SocialLinksFormValues>
      | string,
  ) => {
    setLoading(false);
    setIsDisabled(true);
    console.log("error: ", error);
    toast.error("Some errors occurred.", {
      description: (
        <ul>
          {Object.values(error).map((err, index) => (
            <li key={index}>{err.message?.toString()}</li>
          ))}
        </ul>
      ),
      position: "top-left",
    });
  };

  const onSuccess = () => {
    ref.current = null;
    const p = onboardingPages.find((page) => page.id === currentPage + 2);
    const pid = p?.pageName;
    setLoading(false);
    router.push(`?page=${pid}`);
  };

  const handleChangeValue = () => {
    setIsDisabled(false);
  };

  useEffect(() => {
    pushParams();
  }, [searchParams]);

  useEffect(() => {
    console.log("currentPage: ", currentPage);
  }, [currentPage]);

  return (
    <RegisterPageLayout image={<AuthImageComp />}>
      <div className="">
        <div className="">
          <Logo className="mx-auto" size={80} />
        </div>
        <div className="w-full overflow-hidden">
          <motion.div
            className={`flex w-full space-x-[var(--register-form-spacing)] px-[var(--register-form-padding)]`}
            animate={{
              x: `calc(-1 * var(--register-form-full) * ${currentPage})`,
            }}
            transition={{ type: "spring", damping: 15 }}
          >
            {onboardingPages.map(({ page: Page, id }) => (
              <div key={id}>
                <Page
                  onError={id === currentPage + 1 ? onError : undefined}
                  onSuccess={id === currentPage + 1 ? onSuccess : undefined}
                  ref={id === currentPage + 1 ? ref : undefined}
                  onChangeValue={
                    id === currentPage + 1 ? handleChangeValue : undefined
                  }
                />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="px-[var(--register-form-padding)]">
          <RegisterFormControls
            isNextDisabled={isDisabled}
            currentPage={currentPage}
            isLoading={isButtonLoading}
            numberOfPages={numberOfPages}
            onNext={() => {
              ref.current?.();
            }}
            onPrev={() => {
              const p = onboardingPages.find((page) => page.id === currentPage);
              const pid = p?.pageName;
              router.push(`?page=${pid}`);
            }}
          />
        </div>
      </div>
    </RegisterPageLayout>
  );
};

export default OnboardingPageLayout;

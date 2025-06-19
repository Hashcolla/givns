import type { PropsWithChildren, ReactNode } from "react";
import img from "@/assets/images/img2.jpg";
import Image from "next/image";

type RegisterPageLayoutProps = {
  image: ReactNode;
} & PropsWithChildren;

const RegisterPageLayout = ({ children }: RegisterPageLayoutProps) => {
  return (
    <div className="text-foreground flex h-screen w-full overflow-hidden dark:bg-background">
      {/* content  */}
      <div className="flex h-full w-full items-center justify-center md:w-fit  register-form-sizes">
        <div className="flex h-full flex-col max-w-[var(--register-form-full)] bg-blue-30 justify-center">
          {children}
        </div>
      </div>
      {/* image  */}
      <div className="flex-1 p-7 pl-0 hidden md:block">
        <Image
          className="h-full w-full rounded-2xl object-cover"
          src={img}
          alt="img"
        />
      </div>
    </div>
  );
};

export default RegisterPageLayout;

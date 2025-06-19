import type { PropsWithChildren, ReactNode } from "react";

type AuthLayoutProps = {
  image: ReactNode;
} & PropsWithChildren;

const AuthLayout = ({ children, image }: AuthLayoutProps) => {
  return (
    <div className="bg-background text-foreground flex h-screen w-full">
      {/* image  */}
      {image}

      {/* content  */}
      <div className="flex h-full w-full items-center justify-center md:w-fit">
        <div className="mx-10 flex h-full max-w-[400px] flex-col items-center justify-between md:justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

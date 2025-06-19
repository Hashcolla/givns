"use client";

import image from "@/assets/images/img1.jpg";
import AppleSvg from "@/assets/images/svg/AppleIcon";
import GoogleSvg from "@/assets/images/svg/GoogleIcon";
import AuthLayout from "@/components/auth/AuthLayout";
import SignInFormModal from "@/components/auth/SignInFormModal";
import SignupFormModal from "@/components/auth/SignupFormModal";
import {Button} from "@/components/ui/Button";
import { useModal } from "@/components/ui/Modal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { googleSign } from "@/actions/authActions";
import { toast } from "sonner";

const AuthPage = () => {
  const { showModal, isBackgroundClosable } = useModal();
  const [anyButtonPressed, setAnyButtonPressed] = useState(false);

  useEffect(() => {
    isBackgroundClosable(false);
  }, []);

  const handleSignUp = () => {
    showModal(<SignupFormModal />);
  };

  const handleSignIn = () => {
    showModal(<SignInFormModal />);
  };

  const handleGoogleSign = async () => {
    setAnyButtonPressed(true);

    try {
      const res = await googleSign();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <AuthLayout image={<AuthImageComp />}>
      {/* Logo  */}
      {/* <LogoImg /> */}

      {/* apple, google btns  */}
      <AuthButtons
        handleSignUp={handleSignUp}
        handleGoogleSign={handleGoogleSign}
        anyButtonPressed={anyButtonPressed}
      />

      {/* already have account  */}
      <SignInButtons handleSignin={handleSignIn} />
    </AuthLayout>
  );
};

const LogoImg = () => {
  return (
    <div className="mt-30 flex justify-center md:mt-0 md:mb-20">
      {/* <Logo className="w-20" /> */}
    </div>
  );
};

export default AuthPage;

export const AuthImageComp = () => {
  return (
    <div className="hidden flex-1 overflow-hidden md:block">
      <Image
        loading="lazy"
        className="h-full w-full object-cover"
        src={image}
        alt=""
      />
    </div>
  );
};

type AuthButtonCompProps = {
  handleSignUp?: () => void;
  handleGoogleSign?: () => void;
  anyButtonPressed: boolean;
};

const AuthButtons = ({
  anyButtonPressed,
  handleGoogleSign,
  handleSignUp,
}: AuthButtonCompProps) => {
  return (
    <div className="w-full">
      <h1 className="mb:text-4xl mb-5 text-2xl font-bold md:mb-8">
        Help today.
      </h1>

      {/* Google btn  */}

      <Button
        onClick={handleGoogleSign}
        disabled={anyButtonPressed}
        className="bg-surface mb-5 flex w-full items-center justify-center"
      >
        <GoogleSvg size={30} />
        <span>Sign in with Google</span>
      </Button>

      {/* Apple btn  */}

      <Button
        disabled={anyButtonPressed}
        className="bg-surface flex w-full items-center justify-center"
      >
        <AppleSvg className="fill-invert" size={30} />
        <span>Continue with Apple</span>
      </Button>

      <div className="my-4 flex w-full items-center space-x-2 md:my-5">
        <hr className="bg-secondary flex-1" />
        <span className="text-ring">OR</span>
        <hr className="bg-secondary flex-1" />
      </div>

      <Button
        onClick={handleSignUp}
        className="bg-primary mb-2 flex w-full items-center justify-center"
      >
        <span className="text-white">Create account</span>
      </Button>
      <p className="text-secondary text-xs">
        By signing up, you agree to the Terms of Service and
        <Link href={""} className="text-link">
          Privacy Policy
        </Link>
        , including
        <Link href={""} className="text-link">
          Cookie Use
        </Link>
        .
      </p>
    </div>
  );
};

type SignInButtonCompProps = {
  handleSignin?: () => void;
};

const SignInButtons = ({ handleSignin }: SignInButtonCompProps) => {
  return (
    <div className="mb-6 w-full">
      <h1 className="text-surface mb-5 text-lg font-bold md:mt-10 md:text-xl">
        Already have an account?
      </h1>
      <Button
        onClick={handleSignin}
        variant={"outline"}
        className="text-primary w-full"
      >
        Sign In
      </Button>
    </div>
  );
};

"use client";

import React, { useActionState } from "react";
import { signOut } from "@/actions/authActions";
import {Button} from "../ui/Button";

const SignOutButton = () => {
  const [, logOut, isLoading] = useActionState(signOut, null);

  return (
    <form action={logOut}>
      <Button type="submit">{isLoading ? "Loading..." : "Sign out"}</Button>
    </form>
  );
};

export default SignOutButton;

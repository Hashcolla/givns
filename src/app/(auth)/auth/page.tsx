import AuthPage from "./AuthPage";
import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const page = async () => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  if (user) {
    redirect("/"); // Redirect to home if user is already authenticated
  }

  return <AuthPage />;
};

export default page;

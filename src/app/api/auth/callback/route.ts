import { addUserToTable } from "@/actions/authActions";
import { supabaseServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code") as string;
  const origin = url.origin;
  const client = await supabaseServer();

  if (code) {
    const { error } = await client.auth.exchangeCodeForSession(code);

    if (!error) {
      try {
        await addUserToTable();
      } catch (e: any) {
        if (e.code === "23505") {
          return NextResponse.redirect(`${origin}`);
        }
        console.log(e);
        return NextResponse.json({
          message: "Error occured in adding user to db",
        });
      }

      return NextResponse.redirect(`${origin}`);
    }
  }
}

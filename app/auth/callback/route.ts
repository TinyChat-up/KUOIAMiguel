import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  let response = NextResponse.redirect(new URL("/profile", request.url));

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.headers.get("cookie")
            ?.split("; ")
            .find((cookie) => cookie.startsWith(`${name}=`))
            ?.split("=")[1];
        },
        set(name: string, value: string, options: Record<string, string | number | boolean>) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: Record<string, string | number | boolean>) {
          response.cookies.set({ name, value: "", ...options });
        }
      }
    }
  );

  await supabase.auth.exchangeCodeForSession(code);
  return response;
}

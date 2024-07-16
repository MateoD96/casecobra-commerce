"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav
      className=" sticky top-0 z-[100] h-14 inset-x-0 w-full border-b border-gray-200
     bg-white/75 backdrop-blur-lg transition-all"
    >
      <MaxWidthWrapper>
        <div className=" flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href={"/"} className="flex z-40 font-semibold">
            case<span className=" text-green-600">cobra</span>
          </Link>
          <div className=" h-full flex items-center space-x-4">
            {user && session.status !== "loading" && (
              <>
                <Avatar className=" w-10 h-10">
                  <AvatarImage src={user.image!} />
                </Avatar>
                <button
                  onClick={() => signOut()}
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign Out
                </button>

                {isAdmin ? (
                  <Link
                    href={"/dashboard"}
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Dashboard
                  </Link>
                ) : null}

                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    size: "sm",
                    className: " hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Case <ArrowRight className=" ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}

            {!user && session.status !== "loading" && (
              <>
                <button
                  onClick={() => signIn()}
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Login
                </button>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>

                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    size: "sm",
                    className: " hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Case <ArrowRight className=" ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 shadow-light-300 custom-scrollbar fixed top-0 flex min-h-screen w-[18%] min-w-32 flex-col justify-between gap-3 overflow-y-auto px-6 max-lg:w-[12%] max-lg:items-center max-sm:hidden dark:shadow-none">
      <div className="mt-36 grow">
        {sidebarLinks.map((link, index) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={index}
              className={`${isActive ? "primary-gradient text-light-900 rounded-lg" : "text-dark300_light900"} flex items-center justify-start gap-3 bg-transparent p-4`}
            >
              <Image
                src={link.imgURL}
                width={20}
                height={20}
                alt={link.label}
                className={`${!isActive && "invert-colors"}`}
              />
              <p
                className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="mb-6">
        <SignedOut>
          <div className="flex w-full flex-col gap-3">
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary flex min-h-[41px] w-full gap-2 rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/account.svg"
                  alt="sign in"
                  width={20}
                  height={20}
                  className="invert-colors hidden max-lg:block"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Sign In
                </span>
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full gap-2 rounded-lg p-2 shadow-none">
                <Image
                  src="/assets/icons/sign-up.svg"
                  alt="sign in"
                  width={20}
                  height={20}
                  className="invert-colors hidden max-lg:block"
                />
                <span className=" max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSidebar;

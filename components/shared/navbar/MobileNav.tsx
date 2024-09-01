"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <section className="flex max-h-screen flex-col gap-3 pt-5">
      {sidebarLinks
        .filter((link) => !(link.route === "/profile" && !user)) // filter out profile link if no user
        .map((link, index) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <SheetClose asChild key={link.route}>
              <Link
                href={
                  link.route === "/profile" && user
                    ? `/profile/${user?.id}`
                    : link.route === "/profile"
                      ? "/sign-in"
                      : link.route
                }
                key={index}
                className={`${
                  isActive
                    ? "primary-gradient text-light-900 rounded-lg text-sm"
                    : "text-dark300_light900 text-xs"
                } flex items-center justify-start gap-3 bg-transparent p-4 `}
              >
                <Image
                  src={link.imgURL}
                  width={20}
                  height={20}
                  alt={link.label}
                  className={`${!isActive && "invert-colors"}`}
                />
                <p className={`${isActive ? "font-bold" : "text-base"}`}>
                  {link.label}
                </p>
              </Link>
            </SheetClose>
          );
        })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          className="invert-colors sm:hidden"
          width={36}
          height={36}
          alt="Menu"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 flex flex-col"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="TechFlow"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Tech <span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <div className="flex h-full flex-col justify-between">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-2 sm:mb-6">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Sign In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary min-h[41px] text-dark400_light900 w-full rounded-lg px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

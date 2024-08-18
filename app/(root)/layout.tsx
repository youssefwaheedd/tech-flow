import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";
import LeftSideBar from "@/components/shared/navbar/LeftSidebar";
import RightSidebar from "@/components/shared/navbar/RightSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 flex flex-col">
      <Navbar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      Toaster
    </main>
  );
};

export default Layout;

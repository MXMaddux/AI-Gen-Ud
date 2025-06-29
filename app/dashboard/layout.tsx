import MobileNav from "@/components/nav/mobile-nav";
import SideNav from "@/components/nav/side-nav";
import React from "react";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-1/4 h-full">
        <SideNav />
      </div>
      <div className="flex flex-col md:flex-row flex-1 w-full">
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;

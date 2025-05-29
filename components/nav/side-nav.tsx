"use client";

import {
  FileClock,
  LayoutDashboard,
  Settings,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav() {
  const path = usePathname();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="h-screen p-5 shadow-sm border">
      <ul className="flex-1 space-y-2">
        {menu.map((item, index) => (
          <li
            key={index}
            className={`${
              path === item.path
                ? "border-primary text-primary"
                : "hover:border-primary hover:text-primary"
            } flex m-2 mr-2 p-2 rounded-lg cursor-pointer border`}
          >
            <div className="flex justify-center items-center md:justify-start w-full">
              <Link href={item.path} className="flex">
                <item.icon />{" "}
                {/* use hidden class to show only icon in small screen */}
                <span className="ml-2 hidden md:inline">{item.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SideNav;

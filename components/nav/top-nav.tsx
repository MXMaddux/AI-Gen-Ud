"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import logo from "@/public/logo.svg";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

function TopNav() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={50} height={50} priority />
      </Link>
      <div className="flex items-center">
        {isSignedIn && (
          <Link href={"/dashboard"} className="mr-2">
            {`${user.fullName}'s`} Dashboard
          </Link>
        )}
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
export default TopNav;

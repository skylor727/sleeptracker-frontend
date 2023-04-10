
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileMenu from "./MobileMenu";

export const Navbar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handlePathChange = async (path: string) => {
    await router.push(path);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/sleep-tracker" });
  };

  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <div className="flex items-center justify-between px-4">
      <div className="logo flex items-center text-3xl font-bold text-blue-500">
        <div className="relative mr-2 h-8 w-8 overflow-hidden rounded-full bg-blue-500">
          <div className="absolute top-0 left-1 h-16 w-16 rounded-full bg-white"></div>
        </div>
        <Link href="/">
          <div onClick={() => void handlePathChange("/")}>Sleep Tracker</div>
        </Link>
      </div>
      {sessionData?.user ? (
        <div className="hidden items-center space-x-4 md:flex">
          <Link href="/sleep" className="text-lg font-semibold">
            Sleep Calculator
          </Link>
          <span>|</span>
          <Link
            className="text-lg font-semibold"
            href={`/sleeps/${sessionData.user.id}`}
          >
            Sleep Log
          </Link>
          <span>|</span>
          <span className="mr-5">Welcome, {sessionData?.user?.name}</span>
          <label
            tabIndex={0}
            className="btn-ghost btn-circle avatar btn"
            onClick={() => void handleSignOut()}
          >
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src={sessionData?.user?.image ?? ""}
                alt={sessionData?.user?.name ?? "User"}
                className="object-cover"
                width={50}
                height={40}
              />
            </div>
          </label>
        </div>
      ) : (
        <button
          className="btn-ghost rounded-btn btn hidden md:block"
          onClick={() => void handleSignIn()}
        >
          Sign in
        </button>
      )}
      <div className="md:hidden">
        {sessionData?.user ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <span className="mb-1 block h-0.5 w-6 bg-blue-500"></span>
            <span className="mb-1 block h-0.5 w-6 bg-blue-500"></span>
            <span className="block h-0.5 w-6 bg-blue-500"></span>
          </button>
        ) : (
          <button
            className="btn-ghost rounded-btn btn"
            onClick={() => void handleSignIn()}
          >
            Sign in
          </button>
        )}
      </div>
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sessionData={sessionData}
        handleSignOut={handleSignOut}
      />
    </div>
  );
};

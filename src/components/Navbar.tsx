import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const handlePathChange = async (path: string) => {
    await router.push(path);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <div className="flex justify-between">
      <div className="logo flex items-center text-3xl font-bold text-blue-500">
        <div className="relative mr-2 h-8 w-8 overflow-hidden rounded-full bg-blue-500">
          <div className="absolute top-0 left-1 h-16 w-16 rounded-full bg-white"></div>
        </div>
        <Link href="/">
          <div onClick={() => void handlePathChange("/")}>Sleep Tracker</div>
        </Link>
      </div>
      {sessionData?.user ? (
        <div className="flex items-center space-x-4">
          <Link href="/sleep" className="text-lg font-semibold">
            Sleep Calculator
          </Link>
          <span>|</span>
          <Link
            className="text-lg font-semibold"
            href={`/sleeps/${sessionData.user.id}`}
          >Sleep Log</Link>
          <span>|</span>
          <span className="mr-5">Welcome, {sessionData?.user?.name}</span>
          <label
            tabIndex={0}
            className="btn-ghost btn-circle avatar btn"
            onClick={() => void handleSignOut()}
          >
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={sessionData?.user?.image ?? ""}
                alt={sessionData?.user?.name ?? "User"}
                className="object-cover"
                width={100}
                height={100}
              />
            </div>
          </label>
        </div>
      ) : (
        <button
          className="btn-ghost rounded-btn btn"
          onClick={() => void handleSignIn()}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

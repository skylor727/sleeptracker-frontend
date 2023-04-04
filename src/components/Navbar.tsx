import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const handlePathChange = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex justify-between">
      <div className="logo flex items-center text-3xl font-bold text-blue-500">
        <div className="relative mr-2 h-8 w-8 overflow-hidden rounded-full bg-blue-500">
          <div className="absolute top-0 left-1 h-16 w-16 rounded-full bg-white"></div>
        </div>
        <a href="#" onClick={() => handlePathChange("/")}>
          <div>Sleep Tracker</div>
        </a>
      </div>
      {sessionData?.user ? (
        <div className="flex items-center">
          <span className="mr-5">Welcome, {sessionData?.user?.name}</span>
          <label
            tabIndex={0}
            className="btn-ghost btn-circle avatar btn"
            onClick={() => void signOut()}
          >
            <img
              src={sessionData?.user?.image ?? ""}
              alt={sessionData?.user?.name ?? "User"}
              className="h-10 w-10 rounded-full object-cover"
            />
          </label>
        </div>
      ) : (
        <button
          className="btn-ghost rounded-btn btn"
          onClick={() => void signIn()}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

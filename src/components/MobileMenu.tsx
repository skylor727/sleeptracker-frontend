/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sessionData: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  sessionData,
  handleSignOut,
}) => {
  const router = useRouter();
  const handlePathChange = async (path: string) => {
    await router.push(path);
  };

  return isOpen ? (
    <div className="absolute top-0 left-0 z-50 h-full w-full">
      <div
        className="h-full w-full bg-black opacity-50"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
      ></div>
      <div className="absolute top-0 left-0 z-10 h-full w-64 overflow-y-auto bg-white p-6">
        <div className="mb-4">
          <Link
            href="/sleep"
            className="text-lg font-semibold"
            onClick={(e) => {
              setIsOpen(false);
              handlePathChange(e.currentTarget.href);
            }}
          >
            Sleep Calculator
          </Link>
        </div>
        <div className="mb-4">
          <Link
            className="text-lg font-semibold"
            onClick={(e) => {
              setIsOpen(false);
              handlePathChange(e.currentTarget.href);
            }}
            href={`/sleeps/${sessionData.user.id}`}
          >
            Sleep Log
          </Link>
        </div>
        <div className="mb-4">
          <button className="text-lg font-semibold" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default MobileMenu;

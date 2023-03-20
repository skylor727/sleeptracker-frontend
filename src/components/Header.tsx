import { signIn, signOut, useSession } from "next-auth/react"
export const Header = () => {
    return (
        <>
            <div className="flex justify-between">
                <div className="flex items-center text-3xl font-bold text-blue-500 logo">
                    <div className="w-8 h-8 rounded-full bg-blue-500 mr-2 quarter-moon">
                        <div className="w-6 h-6 rounded-full bg-gray-200 transform rotate-45 origin-top-right"></div>
                    </div>
                    <div>Sleep Tracker</div>
                </div>
                <button
                    onClick={() => void signIn()}
                    className="btn-ghost rounded-btn btn justify-end">
                    Sign in
                </button>
            </div>
        </>
    );
};




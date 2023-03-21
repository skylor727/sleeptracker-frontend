import { signIn, signOut, useSession } from "next-auth/react"

export const Header = () => {
    const { data: sessionData } = useSession();
    return (
        <div className="flex justify-between">
            <div className="flex items-center text-3xl font-bold text-blue-500 logo">
                <div className="w-8 h-8 bg-blue-500 mr-2 relative overflow-hidden rounded-full">
                    <div className="w-16 h-16 bg-white absolute top-0 left-1 rounded-full"></div>
                </div>
                <div>Sleep Tracker</div>
            </div>
            {sessionData?.user ? (
                <div className="flex items-center">
                    <span className="mr-5">Welcome, {sessionData?.user?.name}</span>
                    <label tabIndex={0} className="btn-ghost btn-circle avatar btn" onClick={() => void signOut()}>
                        <div className="w-10 rounded-full">
                            <img src={sessionData?.user?.image ?? ""} alt={sessionData?.user?.image ?? ""} />
                        </div>
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

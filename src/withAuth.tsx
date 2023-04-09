import React from "react";
import { useSession, signIn } from "next-auth/react";

const withAuth = (Component: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { data: sessionData, status } = useSession();

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (!sessionData?.user) {
      void signIn("google");
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

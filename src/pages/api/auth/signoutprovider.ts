import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth";

export default async function signOutProvider(req, res) {
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    if (session?.idToken) {
      try {
        // destroy user's session on the provider
        await fetch("google/protocol/openid-connect/logout", { params: id_token_hint: session.idToken });
        res.status(200).json(null);
      }
      catch (error) {
        res.status(500).json(null);
      }
    } else {
      // if user is not signed in, give 200
      res.status(200).json(null);
    }
  }
}
export async function theRealSignOut(args) {
  try {
    await axios.put("/api/auth/signoutprovider", null);
    // signOut only if PUT was successful
    return await signOut(args);
  } catch (error) {
    // <show some notification to user asking to retry signout>
    throw error;
  }
}
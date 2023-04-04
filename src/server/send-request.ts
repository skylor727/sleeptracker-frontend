import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
let base_url = "http://localhost:8080";
type SleepFormData = { [index: string]: string };

export const sendRequest = async (
  method: string,
  apiUrl: string,
  payload?: SleepFormData | string
) => {
  const session = await getSession();
  console.log(session);
  const options: RequestInit = {
    method: method,
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: payload ? JSON.stringify(payload) : undefined,
  };
  let url = `${base_url}${apiUrl}`;
  url = encodeURI(url);
  const res = await fetch(url, options);
  if (res.ok) {
    try {
      return await res.json();
    } catch (e) {
      console.log("error with json  " + e);
    }
  }
};

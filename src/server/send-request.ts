let base_url = "http://localhost:8080/sleeps-api";
type SleepFormData = { [index: string]: string };

export const sendRequest = async (
  method: string,
  apiUrl: string,
  payload?: SleepFormData | string,
  token?: string
) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const options: RequestInit = {
    method: method,
    credentials: "include",
    headers,
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

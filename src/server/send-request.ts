let base_url = "http://localhost:8080";
type SleepFormData = { [index: string]: string };

export const sendRequest = async (
  method: string,
  apiUrl: string,
  payload?: SleepFormData
) => {
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
  console.log(res);
  if (res.ok) return res.json();
};

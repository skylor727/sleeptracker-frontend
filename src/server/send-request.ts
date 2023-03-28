let base_url = "http://localhost:8080";
type SleepFormData = { [index: string]: string };

export const sendRequest = async (method: string, payload?: SleepFormData) => {
  let options = { method: "", headers: {}, body: "" };
  let url = `${base_url}/sleep`;
  url = encodeURI(url);
  if (payload) {
    options.method = method;
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(url, options);
  if (res.ok) return res.json();
};

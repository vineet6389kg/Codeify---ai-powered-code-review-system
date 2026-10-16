const API = import.meta.env.VITE_API_URL;

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const signupApi = (body) => request("/auth/signup", { method: "POST", body });
export const loginApi = (body) => request("/auth/login", { method: "POST", body });
export const meApi = (token) => request("/auth/me", { token });
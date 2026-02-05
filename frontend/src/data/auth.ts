import { backendServiceURL as authServiceURL } from "../utils/index.ts";
export async function register(body: User & { password: string; confirmPassword: string }) {
  const { firstName, lastName, email, password, confirmPassword } = body;

  const response = await fetch(`${authServiceURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }),
    credentials: "include"
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    if (!errorData.message) {
      throw new Error("An error occurred while creating new user");
    }
    throw new Error(errorData.message);
  }
  const data = await response.json();
  return data;
}

export async function login(body: { email: string; password: string }) {
  const { email, password } = body;

  const response = await fetch(`${authServiceURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    }),
    credentials: "include"
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    if (!errorData.message) {
      throw new Error("An error occurred while login");
    }
    throw new Error(errorData.message);
  }
  const data = await response.json();
  return data;
}

export async function getMe() {
  const userRes = await fetch(`${authServiceURL}/auth/me`);
  if (!userRes.ok) throw new Error("Get user data failed");
  return userRes.json();
}

export async function refresh() {
  const res = await fetch(`${authServiceURL}/auth/refresh`, {
    method: "POST"
  });

  if (!res.ok) return;
}

export async function logout() {
  const res = await fetch(`${authServiceURL}/auth/logout`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Logout failed");
}

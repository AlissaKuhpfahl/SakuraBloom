import { backendServiceURL } from "../utils";

export async function addProfile(profileName: string, avatarUrl: string, id: string) {
  const res = await fetch(`${backendServiceURL}/profiles/progress/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      profileName,
      avatarUrl
    }),
    credentials: "include"
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);
    if (!errorData.error) {
      throw new Error(errorData.message);
    }
    throw new Error(errorData.error);
  }
  return res.json();
}

export async function readProfiles(profileName: string, avatarUrl: string, id: string) {
  const res = await fetch(`${backendServiceURL}/profiles/progress/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      profileName,
      avatarUrl
    }),
    credentials: "include"
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);
    if (!errorData.error) {
      throw new Error(errorData.message);
    }
    throw new Error(errorData.error);
  }
  return res.json();
}

// export async function updateProgress(id: string) {
//   // const { email, password } = body;

//   const res = await fetch(`${backendServiceURL}/profiles/progress/${id}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//     credentials: "include",
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     if (!errorData.error) {
//       throw new Error(errorData.message);
//     }
//     throw new Error(errorData.error);
//   }
//   return res.json();
// }

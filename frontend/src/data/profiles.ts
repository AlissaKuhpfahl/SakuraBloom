import { backendServiceURL } from "../utils";

export async function addProfile(profileName: string, avatarUrl: string) {
  const res = await fetch(`${backendServiceURL}/profiles/add`, {
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
      throw new Error("Error while adding profile");
    }
    throw new Error(errorData.error);
  }
  return res.json();
}

export async function setActiveProfile(profileId: string) {
  const res = await fetch(`${backendServiceURL}/profiles/activeProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      profileId
    }),
    credentials: "include"
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);

    if (!errorData.message) {
      throw new Error("Error while update active profile");
    }
    throw new Error(errorData.message);
  }
  const data = await res.json();
  return data;
}

export async function readProfiles() {
  const res = await fetch(`${backendServiceURL}/profiles`);

  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);

    if (!errorData.message) {
      throw new Error("Error while read profiles");
    }
    throw new Error(errorData.message);
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

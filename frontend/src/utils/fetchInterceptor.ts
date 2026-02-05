const originalFetch = fetch;
export const backendServiceURL = import.meta.env.VITE_APP_BACKEND_URL;
const dev = import.meta.env.MODE;
if (!backendServiceURL) {
  console.error("No Auth service set");
  console.log("mode: ", dev);
}

window.fetch = async (url, options, ...rest) => {
  let res = await originalFetch(
    url,
    { ...options, credentials: "include" },
    ...rest,
  );
  const authHeader = res.headers.get("WWW-Authenticate");
  if (authHeader?.includes("token_expired")) {
    console.log("ATTEMPT REFRESH");
    const refreshRes = await originalFetch(`${backendServiceURL}/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!refreshRes.ok) throw new Error("Login required");
    res = await originalFetch(
      url,
      { ...options, credentials: "include" },
      ...rest,
    );
  }
  return res;
};

// export { backendServiceURL };

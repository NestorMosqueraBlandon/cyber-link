export const getConfig = () => {
  const token = localStorage.getItem("token");
  const tokenWithoutQuotes = token?.replace(/"/g, "");
  if (!tokenWithoutQuotes) {
    throw new Error("Token not found in local storage");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${tokenWithoutQuotes}`,
    },
  };
  return config;
};

import axios from "axios";

const ACCESS_KEY = "FUAjS0pVazIarGNxIFJCWbWvCa5yo3mfyP2CRZgxI4E";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  params: {
    client_id: ACCESS_KEY,
    per_page: 12,
    orientation: "landscape",
  },
});

export const fetchImages = async (query, page, signal) => {
  const { data } = await unsplashApi.get("/search/photos", {
    params: { query, page },
    signal,
  });

  return {
    results: data.results,
    totalPages: data.total_pages,
  };
};

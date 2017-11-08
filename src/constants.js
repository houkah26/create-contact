export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://sibi-contact-list-api.herokuapp.com/api"
    : "http://localhost:8000/api";

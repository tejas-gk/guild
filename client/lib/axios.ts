import axios from "axios";

function BearerToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("token");
  }
}
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${BearerToken()}`,
  },
  withCredentials: true,
});

export default function BearerToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("token");
  }
}

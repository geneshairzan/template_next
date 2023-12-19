import clientMiddleware from "./middleware/client";
import serverMiddleware from "./middleware/server";

export async function middleware(r) {
  return r.url.includes("/api/") ? serverMiddleware(r) : clientMiddleware(r);
}

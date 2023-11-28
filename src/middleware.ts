export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/modules",
    "/projects",
    "/modules/:path*",
    "/projects/:path*",
  ],
};

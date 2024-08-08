import { auth } from "./auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.endsWith("/dashboard")) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

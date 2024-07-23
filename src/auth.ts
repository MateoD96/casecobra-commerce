import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/snake-1.png",
  },
  session: { strategy: "jwt" },
  providers: [Google],

  callbacks: {},
});

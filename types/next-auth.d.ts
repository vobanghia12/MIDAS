import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      email: string;
      is_admin: boolean;
      school_id: string;
    } & DefaultSession["user"];
  };

  interface User {
    id: string;
    username: string;
    email: string;
    is_admin: boolean;
    school_id: string;
  };

  interface JWT {
    id: string;
    username: string;
    email: string;
    is_admin: boolean;
    school_id: string;
  };
}
import { betterAuth } from "better-auth";
import { db } from "./db";

export const auth = betterAuth({
  database: {
    client: db,
    type: "libsql",
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});

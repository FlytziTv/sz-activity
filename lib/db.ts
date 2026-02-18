import { createClient } from "@libsql/client";

// On initialise le client avec une logique de bascule
export const db = createClient({
  url:
    process.env.NODE_ENV === "production"
      ? process.env.TURSO_DATABASE_URL!
      : "file:sqlite.db",
  authToken:
    process.env.NODE_ENV === "production"
      ? process.env.TURSO_AUTH_TOKEN
      : undefined,
});

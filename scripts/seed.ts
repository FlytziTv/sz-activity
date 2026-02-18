import { db } from "../lib/db";

async function init() {
  console.log(
    "⏳ Initialisation de la base de données (Better Auth + Stuff)...",
  );

  try {
    // 1. Table USER (Better Auth)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        emailVerified BOOLEAN NOT NULL,
        image TEXT,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      );
    `);

    // 2. Table SESSION (Better Auth)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS session (
        id TEXT PRIMARY KEY,
        expiresAt DATETIME NOT NULL,
        token TEXT NOT NULL UNIQUE,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        ipAddress TEXT,
        userAgent TEXT,
        userId TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE
      );
    `);

    // 3. Table ACCOUNT (Better Auth - utile pour Google/GitHub login)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS account (
        id TEXT PRIMARY KEY,
        accountId TEXT NOT NULL,
        providerId TEXT NOT NULL,
        userId TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
        accessToken TEXT,
        refreshToken TEXT,
        idToken TEXT,
        accessTokenExpiresAt DATETIME,
        refreshTokenExpiresAt DATETIME,
        scope TEXT,
        password TEXT,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      );
    `);

    // 4. Table VERIFICATION (Better Auth - utile pour le reset de mot de passe)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS verification (
        id TEXT PRIMARY KEY,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        expiresAt DATETIME NOT NULL,
        createdAt DATETIME,
        updatedAt DATETIME
      );
    `);

    // 5. TA TABLE STUFF (Ton application)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS stuff (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
        image TEXT,
        name TEXT NOT NULL,
        brand TEXT,
        category TEXT NOT NULL,
        url TEXT,
        weight INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Index pour la performance
    await db.execute(
      `CREATE INDEX IF NOT EXISTS idx_stuff_userId ON stuff(userId);`,
    );

    console.log("✅ Toutes les tables (Auth + App) sont prêtes !");
  } catch (e) {
    console.error("❌ Erreur lors de l'initialisation :", e);
  }
}

init();

import { db } from "@/lib/db";

const createTables = () => {
  // Table principale des listes
  // db.exec(`
  //   CREATE TABLE IF NOT EXISTS lists (
  //     id TEXT PRIMARY KEY,
  //     userId TEXT NOT NULL,
  //     title TEXT NOT NULL,
  //     icons TEXT,
  //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  //     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  //     FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  //   );
  // `);

  // // Table d'historique pour sauvegarder les modifications
  // db.exec(`
  //   CREATE TABLE IF NOT EXISTS lists_history (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     listId TEXT NOT NULL,
  //     old_title TEXT,
  //     new_title TEXT,
  //     changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  //     FOREIGN KEY (listId) REFERENCES lists(id) ON DELETE CASCADE
  //   );
  // `);

  // // Trigger pour mettre à jour la date ET sauvegarder l'historique
  // db.exec(`
  //   CREATE TRIGGER IF NOT EXISTS trigger_lists_update
  //   AFTER UPDATE ON lists
  //   BEGIN
  //     -- 1. Met à jour la date de modif dans la table principale
  //     UPDATE lists SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;

  //     -- 2. Enregistre ce qui a changé dans l'historique
  //     INSERT INTO lists_history (listId, old_title, new_title)
  //     VALUES (old.id, old.title, new.title);
  //   END;
  // `);

  // --------------------------------------------------------------

  db.exec(`
    CREATE TABLE IF NOT EXISTS stuffs (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      url TEXT NOT NULL,
      weight INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    );
  `);

  console.log("✅ Tables et Triggers de suivi créés !");
};

createTables();

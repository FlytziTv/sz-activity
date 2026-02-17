

CREATE DATABASE IF NOT EXISTS sz_activity;
USE sz_activity;

-- ============================================
-- TABLE: user
-- ============================================
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, 
  password VARCHAR(255) NOT NULL
);

-- ============================================
-- TABLE: activity
-- ============================================
CREATE TABLE activity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  difficulty ENUM('Facile', 'Modérée', 'Difficile', 'Ardu') NOT NULL,
  banner VARCHAR(255) NOT NULL,

  note FLOAT NOT NULL CHECK (note >= 0 AND note <= 5),
  type ENUM('boucle', 'circuit', 'point à point') NOT NULL,
  description TEXT NOT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id)
)

-- ============================================
-- TABLE: activity_data
-- ============================================
CREATE TABLE activity_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  activity_id INT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('randonnée pédestre', 'course à pied', 'escalade', 'kayak', 'ski de randonnée', 'alpinisme', 'trail')),
  duration INT NOT NULL, -- temps de l'activité en minutes calculé automatiquement à partir de la distance le dénivelé avec une vitesse moyenne de 4 km/h pour la randonnée pédestre
  difficulty ENUM('Facile', 'Modérée', 'Difficile', 'Ardu') NOT NULL, 
  denivele_pos INT NOT NULL, -- dénivelé positif en mètres
  denivele_neg INT NOT NULL, -- dénivelé négatif en mètres
  top_points INT NOT NULL, -- point le plus haut en mètres
  bottom_points INT NOT NULL, -- point le plus bas en mètres

  country VARCHAR(255) NOT NULL, -- pays de l'activité
  region VARCHAR(255) NOT NULL, -- région de l'activité
  municipality VARCHAR(255) NOT NULL, -- commune de l'activité

  start_coords VARCHAR(255) NOT NULL, -- coordonnées de départ (format "latitude,longitude")
  end_coords VARCHAR(255) NOT NULL, -- coordonnées d'arrivée (format "latitude,longitude")
  FOREIGN KEY (activity_id) REFERENCES activity(id)
)


-- ============================================
-- TABLE: lists
-- ============================================
CREATE TABLE lists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  color VARCHAR(20) NOT NULL CHECK (color IN ('red', 'blue', 'green', 'yellow', 'purple', 'orange')),
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(25) NOT NULL,
  type ENUM('Privé', 'Public') NOT NULL,
  url VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);


-- ============================================
-- TABLE: stuffs
-- ============================================
CREATE TABLE stuffs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  image VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN (
    'chaussures', 'vetement_pluie', 'couche_isolee', 'bas', 'sous_couche',
    'sac_a_dos', 'tente', 'couchage', 'matelas',
    'cuisine', 'hydratation', 'alimentation',
    'eclairage', 'hygiene', 'orientation', 'accessoire'
  )),
  url VARCHAR(255) NOT NULL,
  weight FLOAT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
)
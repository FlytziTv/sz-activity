import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  integer,
  real,
  pgEnum,
} from "drizzle-orm/pg-core";

// ============ ENUMS ============
export const activityTypeEnum = pgEnum("activity_type", [
  "randonnee",
  "trail",
  "via_ferrata",
  "raquettes",
  "ski_de_rando",
]);

export const routeTypeEnum = pgEnum("route_type", [
  "boucle",
  "aller_retour",
  "point_a_point",
]);

export const difficultyEnum = pgEnum("difficulty", [
  "facile",
  "moyen",
  "difficile",
  "expert",
]);

// ============ BETTER AUTH ============
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),

  // Onboarding
  onboardingCompleted: boolean("onboarding_completed").default(false),

  // Profil randonneur
  level: text("level"), // debutant | intermediaire | expert
  preferredRouteType: text("preferred_route_type"), // boucle | trail | etc.
  country: text("country"), // Pays
  region: text("region"), // Région
  objectives: text("objectives"), // ["se_depasser", "decouvrir", etc.]
  frequency: text("frequency"), // occasionnel | regulier | intensif

  // Corpulence
  weight: integer("weight"), // en kg
  height: integer("height"), // en cm
  shoeSize: integer("shoe_size"), // pointure

  // Objectifs
  annualDistanceGoal: integer("annual_distance_goal"),
  annualActivitiesGoal: integer("annual_activities_goal"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ============ STUFF ============
export const stuff = pgTable("stuff", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  url: text("url"),
  weight: integer("weight").default(0),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ============ FICHE RANDONNEE ============
export const activity = pgTable("activity", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdByUserId: text("created_by_user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  bannerImage: text("banner_image"),

  // Type
  activityType: activityTypeEnum("activity_type")
    .notNull()
    .default("randonnee"),
  routeType: routeTypeEnum("route_type").notNull().default("boucle"),
  difficulty: difficultyEnum("difficulty").notNull().default("moyen"),

  // Stats
  distance: real("distance"), // en km
  duration: integer("duration"), // en minutes
  elevationGain: integer("elevation_gain"), // dénivelé positif en m
  elevationLoss: integer("elevation_loss"), // dénivelé négatif en m
  highestPoint: integer("highest_point"), // point le plus haut en m
  lowestPoint: integer("lowest_point"), // point le plus bas en m

  // Localisation
  country: text("country"),
  region: text("region"),
  startLat: real("start_lat"),
  startLng: real("start_lng"),
  endLat: real("end_lat"),
  endLng: real("end_lng"),

  // Meta
  averageRating: real("average_rating").default(0),
  totalReviews: integer("total_reviews").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Points d'intérêt d'une fiche randonnée
export const hikePointsOfInterest = pgTable("hike_points_of_interest", {
  id: uuid("id").defaultRandom().primaryKey(),
  hikeId: uuid("hike_id")
    .notNull()
    .references(() => activity.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  lat: real("lat"),
  lng: real("lng"),
  type: text("type"), // lac, fontaine, sommet, refuge, etc.
});

// ============ SORTIE UTILISATEUR ============
export const userActivities = pgTable("user_activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  hikeId: uuid("hike_id").references(() => activity.id), // nullable → sortie libre

  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),

  // Stats perso
  distance: real("distance"), // en km
  elevationGain: integer("elevation_gain"),
  duration: integer("duration"), // en minutes

  status: text("status").notNull().default("completed"), // completed | planned

  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Photos d'une sortie
export const userActivityPhotos = pgTable("user_activity_photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  userActivityId: uuid("user_activity_id")
    .notNull()
    .references(() => userActivities.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Stuff utilisé lors d'une sortie
export const userActivityStuff = pgTable("user_activity_stuff", {
  id: uuid("id").defaultRandom().primaryKey(),
  userActivityId: uuid("user_activity_id")
    .notNull()
    .references(() => userActivities.id, { onDelete: "cascade" }),
  stuffId: uuid("stuff_id")
    .notNull()
    .references(() => stuff.id, { onDelete: "cascade" }),
});

// ============ AVIS ============
export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  hikeId: uuid("hike_id")
    .notNull()
    .references(() => activity.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Notes sur 5
  sceneryRating: integer("scenery_rating"), // paysage
  difficultyRating: integer("difficulty_rating"), // difficulté ressentie
  markingRating: integer("marking_rating"), // balisage
  pathRating: integer("path_rating"), // état du sentier

  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============ SOCIAL ============
export const likes = pgTable("likes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  userActivityId: uuid("user_activity_id")
    .notNull()
    .references(() => userActivities.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  userActivityId: uuid("user_activity_id")
    .notNull()
    .references(() => userActivities.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============ LISTES ============
export const lists = pgTable("lists", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  visibility: text("visibility").notNull().default("private"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const listActivities = pgTable("list_activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  listId: uuid("list_id")
    .notNull()
    .references(() => lists.id, { onDelete: "cascade" }),
  hikeId: uuid("hike_id")
    .notNull()
    .references(() => activity.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

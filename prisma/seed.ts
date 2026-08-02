import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "../lib/generated/prisma/client";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEFAULT_CATEGORIES = [
  "Cuisine",
  "Couchage",
  "Vêtements",
  "Hygiène",
  "Navigation & Sécurité",
  "Divers",
];

const DEFAULT_BRANDS = [
  "Decathlon",
  "Salomon",
  "Millet",
  "Lafuma",
  "The North Face",
  "Patagonia",
  "Osprey",
  "MSR",
  "Black Diamond",
  "Columbia",
  "Vaude",
  "Mammut",
];

async function main() {
  for (const name of DEFAULT_CATEGORIES) {
    const existing = await prisma.category.findFirst({
      where: { userId: null, name },
    });
    if (!existing) {
      await prisma.category.create({ data: { name } });
    }
  }
  console.log(`Seeded ${DEFAULT_CATEGORIES.length} default categories.`);

  for (const name of DEFAULT_BRANDS) {
    const existing = await prisma.brand.findFirst({
      where: { userId: null, name },
    });
    if (!existing) {
      await prisma.brand.create({ data: { name } });
    }
  }
  console.log(`Seeded ${DEFAULT_BRANDS.length} default brands.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

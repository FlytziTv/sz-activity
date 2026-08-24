-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('OK', 'DAMAGED', 'LOST', 'TO_REPLACE');

-- CreateEnum
CREATE TYPE "HikeStatus" AS ENUM ('DRAFT', 'PREPARING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ItemStatusAfterHike" AS ENUM ('OK', 'LOST', 'DAMAGED', 'CONSUMED');

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "ItemStatus" NOT NULL DEFAULT 'OK',
    "userId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hike" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "status" "HikeStatus" NOT NULL DEFAULT 'DRAFT',
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "plannedWeight" INTEGER,
    "plannedDistance" DOUBLE PRECISION,
    "plannedDuration" INTEGER,
    "plannedElevation" INTEGER,
    "actualDistance" DOUBLE PRECISION,
    "actualDuration" INTEGER,
    "actualElevation" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hike_item" (
    "id" TEXT NOT NULL,
    "hikeId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "planned" BOOLEAN NOT NULL DEFAULT true,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "statusAfter" "ItemStatusAfterHike",

    CONSTRAINT "hike_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_point" (
    "id" TEXT NOT NULL,
    "hikeId" TEXT NOT NULL,
    "label" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "check_point_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_userId_name_key" ON "category"("userId", "name");

-- CreateIndex
CREATE INDEX "item_userId_idx" ON "item"("userId");

-- CreateIndex
CREATE INDEX "hike_userId_idx" ON "hike"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "hike_item_hikeId_itemId_key" ON "hike_item"("hikeId", "itemId");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hike" ADD CONSTRAINT "hike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hike_item" ADD CONSTRAINT "hike_item_hikeId_fkey" FOREIGN KEY ("hikeId") REFERENCES "hike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hike_item" ADD CONSTRAINT "hike_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_point" ADD CONSTRAINT "check_point_hikeId_fkey" FOREIGN KEY ("hikeId") REFERENCES "hike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

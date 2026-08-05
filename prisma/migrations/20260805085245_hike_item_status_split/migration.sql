/*
  Warnings:

  - You are about to drop the column `statusAfter` on the `hike_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hike_item" DROP COLUMN "statusAfter";

-- CreateTable
CREATE TABLE "hike_item_status_split" (
    "id" TEXT NOT NULL,
    "hikeItemId" TEXT NOT NULL,
    "status" "ItemStatusAfterHike" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hike_item_status_split_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hike_item_status_split" ADD CONSTRAINT "hike_item_status_split_hikeItemId_fkey" FOREIGN KEY ("hikeItemId") REFERENCES "hike_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

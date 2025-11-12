/*
  Warnings:

  - You are about to drop the column `protien` on the `loggedMeal` table. All the data in the column will be lost.
  - Added the required column `protein` to the `loggedMeal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."loggedMeal" DROP COLUMN "protien",
ADD COLUMN     "protein" INTEGER NOT NULL;

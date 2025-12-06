/*
  Warnings:

  - You are about to drop the column `available` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `books` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "books_isbn_key";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "available",
DROP COLUMN "isbn",
DROP COLUMN "publisher",
DROP COLUMN "quantity";

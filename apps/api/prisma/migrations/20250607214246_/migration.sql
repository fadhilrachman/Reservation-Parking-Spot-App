/*
  Warnings:

  - The values [unpaid,rejected] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `price` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('paid', 'canceled');
ALTER TABLE "Transaction" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "price" INTEGER NOT NULL;

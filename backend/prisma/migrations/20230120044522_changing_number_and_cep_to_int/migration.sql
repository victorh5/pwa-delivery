/*
  Warnings:

  - The `cep` column on the `address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `number` column on the `phone` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "cep",
ADD COLUMN     "cep" INTEGER;

-- AlterTable
ALTER TABLE "phone" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER;

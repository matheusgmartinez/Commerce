/*
  Warnings:

  - Added the required column `productName` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductOrder" ADD COLUMN     "productName" TEXT NOT NULL;

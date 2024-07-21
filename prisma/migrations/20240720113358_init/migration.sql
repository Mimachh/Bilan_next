/*
  Warnings:

  - You are about to drop the `Day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entreprise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntrepriseMetier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entreprise_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Landing_Page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Metier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entreprise" DROP CONSTRAINT "Entreprise_userId_fkey";

-- DropForeignKey
ALTER TABLE "EntrepriseMetier" DROP CONSTRAINT "EntrepriseMetier_entrepriseId_fkey";

-- DropForeignKey
ALTER TABLE "EntrepriseMetier" DROP CONSTRAINT "EntrepriseMetier_metierId_fkey";

-- DropForeignKey
ALTER TABLE "Landing_Page" DROP CONSTRAINT "Landing_Page_entrepriseId_fkey";

-- DropTable
DROP TABLE "Day";

-- DropTable
DROP TABLE "Entreprise";

-- DropTable
DROP TABLE "EntrepriseMetier";

-- DropTable
DROP TABLE "Entreprise_Type";

-- DropTable
DROP TABLE "Landing_Page";

-- DropTable
DROP TABLE "Metier";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "titleSeo" TEXT,
    "descriptionSeo" TEXT,
    "keywordsSeo" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshCounter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistique" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stat_reference_previous_year" INTEGER,
    "has_starting_stat_to_add" BOOLEAN NOT NULL DEFAULT false,
    "starting_stat_to_add" INTEGER,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refreshId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Statistique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "descrition" TEXT,
    "statistiqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshCounter_name_key" ON "RefreshCounter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshCounter_slug_key" ON "RefreshCounter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Statistique_name_key" ON "Statistique"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Statistique_slug_key" ON "Statistique"("slug");

-- AddForeignKey
ALTER TABLE "Statistique" ADD CONSTRAINT "Statistique_refreshId_fkey" FOREIGN KEY ("refreshId") REFERENCES "RefreshCounter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistique" ADD CONSTRAINT "Statistique_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_statistiqueId_fkey" FOREIGN KEY ("statistiqueId") REFERENCES "Statistique"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

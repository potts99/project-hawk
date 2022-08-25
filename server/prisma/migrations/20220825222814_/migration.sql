-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "projectId" INTEGER;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

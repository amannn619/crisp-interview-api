-- CreateTable
CREATE TABLE "InterviewSession" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "job_title" TEXT NOT NULL,
    "skills" TEXT[],
    "difficulty" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewSession" ADD CONSTRAINT "InterviewSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

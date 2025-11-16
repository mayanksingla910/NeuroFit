-- CreateTable
CREATE TABLE "public"."loggedWorkout" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" TEXT,
    "time" TEXT,
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loggedWorkout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."loggedWorkout" ADD CONSTRAINT "loggedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

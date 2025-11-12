-- CreateTable
CREATE TABLE "public"."loggedMeal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "protien" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loggedMeal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."loggedMeal" ADD CONSTRAINT "loggedMeal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

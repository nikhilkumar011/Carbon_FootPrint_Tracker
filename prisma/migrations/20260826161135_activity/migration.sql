-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "carDistance" INTEGER NOT NULL,
    "bikeDistance" INTEGER NOT NULL,
    "busDistance" INTEGER NOT NULL,
    "trainDistance" INTEGER NOT NULL,
    "flightDistance" INTEGER NOT NULL,
    "electricity" INTEGER NOT NULL,
    "lpg" INTEGER NOT NULL,
    "naturalGas" INTEGER NOT NULL,
    "chicken" INTEGER NOT NULL,
    "vegMeals" INTEGER NOT NULL,
    "dairy" INTEGER NOT NULL,
    "plastic" INTEGER NOT NULL,
    "paper" INTEGER NOT NULL,
    "organic" INTEGER NOT NULL,
    "others" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

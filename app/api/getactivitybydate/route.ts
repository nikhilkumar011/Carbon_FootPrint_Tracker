import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return Response.json(
                { message: "No session" },
                { status: 401 }
            );
        }

        // Start of today in IST
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // Start of tomorrow
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(endOfDay.getDate() + 1);

        const data = await prisma.activity.findFirst({
            where: {
                userId: session.user.id,

                createdAt: {
                    gte: startOfDay,
                    lt: endOfDay,
                },
            },
        });

        if (!data) {
            return Response.json(
                { message: "No data found" },
                { status: 404 }
            );
        }

        return Response.json({data:data});

    } catch (error) {
        console.error("GET ACTIVITY ERROR:", error);

        return Response.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
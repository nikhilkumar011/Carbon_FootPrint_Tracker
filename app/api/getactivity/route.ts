import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return Response.json({ message: "Unauthorised" }, { status: 400 });
        }
        const data = await prisma.activity.findMany({
            where: {
                userId: session?.user?.id
            }
        })

        return Response.json({data},{status:200})



    } catch (error) {
        console.log(error);
        Response.json({ message: "Internal Server Error" })
    }
}
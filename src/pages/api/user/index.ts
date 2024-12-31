import { respond } from "@/utils/resJson";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
    omit: {
      user: {   
        password: true
      }
    }
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    switch (req.method) {
        case 'GET':
             await getAllUser(req, res);
        default:
             respond(405, true, "Method Forbidden", null, res);
    }
    await prisma.$disconnect()
}

async function getAllUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const users = await prisma.user.findMany()
        if(users.length == 0){
            return respond(200, false, "Tidak ada User", [], res)
        }

        return respond(200, false, "Data user berhasil di dapatkan", users, res)
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res)
    }
}
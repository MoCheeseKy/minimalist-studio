import { NextApiResponse } from "next";

export function respond(status: number, isError: boolean, message: string, data:any | null, res: NextApiResponse){
    res.status(status).json({
        status: status,
        message: message,
        data: data
    })
}   
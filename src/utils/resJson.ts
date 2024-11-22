import { NextApiResponse } from "next";

export function respond(status: number, isError: boolean, message: any, data:any | null, res: NextApiResponse){
    res.status(status).json({
        status: status,
        isError: isError,
        message: message,
        data: data
    })
}   
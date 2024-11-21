import { respond } from "@/utils/resJson";
import { NextApiRequest, NextApiResponse } from "next";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    try {
        
        if(req.method != 'POST'){
            respond(405, true, "Method Forbidden", null, res);
        }
        const {
            phone_num,
            fullname,
            gender,
            email,
            password,
            instagram,
            birth_date
        } = req.body;
        if(!emailRegex.test(email)){
            respond(400,true,"Email is Invalid",null,res);
        }

    } catch (error) {
        respond(500,true,"Internal Server Error.",null,res);
    }
}
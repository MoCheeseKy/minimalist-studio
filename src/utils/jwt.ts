import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secret : jwt.Secret = process.env.SECRET || "yb8c7b*&@Y#*&!"
export async function sign(userId:string, fullname:string, role:string): Promise<string | undefined>{
    return new Promise((resolve, reject)=>{
        try {
            const payload = {
                id:userId,
                fullname:fullname,
                role:role
            }
    
            jwt.sign(payload, secret,{expiresIn:"30d"},function(err, token) {
                if(err) reject(err);
                resolve(token);
            })
        } catch (error) {
            reject(error);
        }
    })
}


export async function jwtVerify(token:string) {
    
}
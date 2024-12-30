import { respond } from '@/utils/resJson'
import type { NextApiRequest, NextApiResponse } from 'next'
import { loginValidSchema } from './validation.schema';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sign } from '@/utils/jwt';
import { prisma } from '@/pages/_app';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
      if(req.method != 'POST'){
          return respond(405, true, "Method Forbidden "+req.method, null, res);
        }
        const validationResult = loginValidSchema.validate(req.body);
        
        if(validationResult.error){
          const errorMessage = validationResult.error.details.map(err => err.message);
          return respond(400, true, errorMessage, null, res);
        }
        
        const reqData = validationResult.value;
        const user = await prisma.user.findUnique({where:{phone_num:reqData.phone_num}})
        if(!user){
          return respond(401, true, "Nomor Telepon atau Kata Sandi salah", null, res);
        }

        const passwordMatched = await bcrypt.compare(reqData.password, user.password);

        if(!passwordMatched){
          return respond(401, true, "Nomor Telepon atau Kata Sandi salah", null, res);
        }

        const token = await sign(user.id, user.fullname, user.role);

        return respond(200, false, "Login Success", {'token': token, 'role': user.role}, res);
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);        
    }finally{
      await prisma.$disconnect()
    }
}
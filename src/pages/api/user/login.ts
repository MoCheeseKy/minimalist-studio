import { respond } from '@/utils/resJson'
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        if(req.method != 'POST'){
          respond(405, true, "Method Forbidden", null, res);
        }
        const {phone_num, password} = req.body
        
        // respond(200, false, "Success", )
    } catch (error) {
        
    }
}
import type { NextApiRequest, NextApiResponse } from 'next'
import {responseJson} from '../res.interface'

 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseJson>
) {
    try {
        if(req.method != 'POST') res.status(200).json({status: 405, message:"Method Not Allowed", isError:false, data: "no Data"})
        const {phone_num, password} = req.body
        console.log(req.body)
        res.status(200).json(req.body)
    } catch (error) {
        
    }
}
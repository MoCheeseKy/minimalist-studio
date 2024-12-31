import type { NextApiRequest, NextApiResponse } from 'next'
import { respond } from '@/utils/resJson';
import { classUpdateValidSchema } from './validation.schema';
import { prisma } from '@/pages/_app';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT':
            await updateClass(req, res);
        case 'GET':
            await getByIdClass(req, res);
        case 'DELETE':
            await deleteClass(req, res);
        default:
            respond(405, true, "Method Forbidden", null, res);
    }
    await prisma.$disconnect()
}

async function getByIdClass(
    req:NextApiRequest,
    res:NextApiResponse
) {
    try {
        const {id} = req.query
        if(!id){
            return respond(400, true, "Id harus disertakan", null, res)
        }
        const yogaClass = await prisma.class.findUnique({
            where:{id:String(id)},
            select:{
                id:true,
                category:{select:{
                    id:true,
                    name:true
                }},
                studio:{select:{
                    id:true,
                    name:true,
                    location:true
                }},
                start_at:true,
                end_at:true,
                duration:true,
                description:true,
                instructor:true,
                current_slot:true,
                max_slot:true,
                req_quota:true,
            }
        })
        if(!yogaClass){
            return respond(200, false, `Kelas Yoga id-${id} tidak ada`, null, res)
        }

        return respond(200, false, `Kelas Yoga id-${id} Berhasil Didapatkan`, yogaClass, res)
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);        
    }
}

async function updateClass(
    req:NextApiRequest,
    res:NextApiResponse
) {
    try {
        const {id} = req.query
        if(!id){
            return respond(400, true, "Id harus disertakan", null, res)
        }
        
        const unUpdatedClass = await prisma.class.findUnique({
             where:{id:String(id)}
        })
        if(!unUpdatedClass){
            return respond(200, false, `Kategori id-${id} tidak ada`, null, res);
        }
        
        const validationResult = classUpdateValidSchema.validate(req.body)
        if(validationResult.error){
            const errorMessage = validationResult.error.details.map(err => err.message);
            return respond(400, true, errorMessage, null, res);
        }
        
        const updatedClass = await prisma.class.update({
            where:{id:String(id)},
            data:validationResult.value
        })
        
        if(updatedClass.req_quota == unUpdatedClass.req_quota){
            return respond(200, false, `Kelas id-${id} Berhasil Diperbarui`, updatedClass, res)
        } 
        
        await returnQuotaUser(String(id), updatedClass.req_quota, unUpdatedClass.req_quota)

        return respond(200, false, `Kelas id-${id} Berhasil Diperbarui, dan karena kuota berubah maka beberapa kuota dikembalikan`, updatedClass, res)
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);        
    }
}


async function deleteClass(
    req:NextApiRequest,
    res:NextApiResponse
) {
    try {   
        const {id} = req.query
            if(!id){
            return respond(400, true, "Id harus disertakan", null, res)
        }

        const YogaClass = await prisma.class.findUnique({
            where:{id:String(id)}
        })
        if(!YogaClass){
            return respond(200, false, `Kelas id-${id} tidak ada`, null, res);
        }
        
        await prisma.user_Class.deleteMany({
            where:{class_id:String(id)}
        })
        
        await prisma.class.delete({
            where:{id:String(id)}
        })
        
        await prisma.user.updateMany({
            where:{user_class:{
                some:{class_id:String(id)}
            }},
            data:{quota:{
                increment:YogaClass.req_quota
            }}
        })

        return respond(200, false, `Kelas id-${id} Berhasil Dihapus`, null, res)
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);        
    }
}


async function returnQuotaUser(class_id:string, updatedQuota:number, unUpdateQuota:number){
    try {
        let quotaForUser =
        unUpdateQuota > updatedQuota ?
        unUpdateQuota - updatedQuota :
        unUpdateQuota;

        let isEnough = unUpdateQuota > updatedQuota;

        await prisma.user.updateMany({
            where:{user_class:{
                some:{class_id: class_id}
            }},
            data:{quota:quotaForUser}
        })

        if(!isEnough){
            await prisma.user_Class.delete({
                where:{
                    class_id: String(class_id)
                }
            })
        }
    } catch (error) {
        throw error
    }
}
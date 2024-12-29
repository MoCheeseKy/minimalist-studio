import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { respond } from '@/utils/resJson';
import { categoryValidSchema } from './validation.schema';
import { error } from 'console';
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT':
            return await updateCategory(req, res);
        case 'GET':
            return await getByIdCategory(req, res);
        case 'DELETE':
            return await deleteCategory(req, res);
        default:
            return respond(405, true, "Method Forbidden", null, res);
    }
}

async function updateCategory(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {id}= req.query
        if(!id){
            return respond(400, true, "Id harus disertakan", null, res)
        }
        const category = await prisma.class_Category.findUnique(
            {where:{id:Number(id)}}
        );
        
        if(!category){
            return respond(404, true, `Kategori id-${id} tidak ada`, null, res);
        }

        const validationResult = categoryValidSchema.validate(req.body);
        
        if(validationResult.error){
            const errorMessage = validationResult.error.details.map(err => err.message);
            return respond(400, true, errorMessage, null, res);
        }


        const updatedCategory = await prisma.class_Category.update({
            where:{id:Number(id)},
            data:{name:validationResult.value.name}
        })
        return respond(200, false, `Kategori ${category.name} Berhasil Diperbarui`, updatedCategory, res);
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);        
    }
}

async function getByIdCategory(
    req: NextApiRequest,
    res: NextApiResponse,
) {
   try {
        const {id} = req.query
        if(!id){
            return respond(400, true, "Id harus disertakan", null, res)
        }
        const category = await prisma.class_Category.findUnique(
            {where:{id:Number(id)}}
        );
        
        if(!category){
            return respond(404, true, `Kategori id-${id} tidak ada`, null, res);
        }

        return respond(200, false, `Kategori id-${id} Berhasil Ditemukan`, category, res);
   } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);       
   } 
}

async function deleteCategory(
    req: NextApiRequest,
    res: NextApiResponse,
) {
   try {
        const {id} = req.query
        if(!id){
            return respond(400, true, "Id harus disertakan", null, res)
        }
        const category = await prisma.class_Category.findUnique(
            {where:{id:Number(id)}}
        );
        if(!category){
            return respond(404, true, `Kategori id-${id} tidak ada`, null, res);
        }
        
        await prisma.class_Category.delete({
            where:{id:Number(id)}
        })

        return respond(200, false, `Kategori id-${id} Berhasil Dihapus`, null, res);
   } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);       
   } 
}

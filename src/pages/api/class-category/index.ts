import type { NextApiRequest, NextApiResponse } from 'next';
import { respond } from '@/utils/resJson';
import { categoryValidSchema } from './validation.schema';
import { prisma } from '@/pages/_app';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
       await createCategory(req, res);
    case 'GET':
       await getAllCategory(req, res);
    default:
       respond(405, true, 'Method Forbidden', null, res);
  }
  await prisma.$disconnect()
}

async function createCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validationResult = categoryValidSchema.validate(req.body);

    if (validationResult.error) {
      const errorMessage = validationResult.error.details.map(
        (err) => err.message
      );
      return respond(400, true, errorMessage, null, res);
    }

    const reqData = validationResult.value;
    await prisma.class_Category.create({ data: reqData });
    return respond(
      201,
      false,
      'Kategori ' + reqData.name + ' telah berhasil ditambahkan',
      null,
      res
    );
  } catch (error) {
    console.log(error);
    return respond(500, true, 'Internal Server Error', null, res);
  }
}

async function getAllCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categoryData = await prisma.class_Category.findMany();
    if (categoryData.length == 0) {
      return respond(
        200,
        true,
        'Tidak ada Kelas Kategori yang Tersedia',
        null,
        res
      );
    }
    return respond(
      200,
      false,
      'Data Kategori Kelas Berhasil di dapatkan',
      categoryData,
      res
    );
  } catch (error) {
    console.log(error);
    return respond(500, true, 'Internal Server Error', null, res);
  }
}

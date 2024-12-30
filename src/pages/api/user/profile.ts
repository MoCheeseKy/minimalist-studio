import { respond } from '@/utils/resJson'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/pages/_app';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
}
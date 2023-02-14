// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  console.log(process.env.DATABASE_URL)
  const cereals = await prisma.cereals.findMany()
  res.status(200).json(cereals)
}

export default handler

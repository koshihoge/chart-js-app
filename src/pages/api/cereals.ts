// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { cereals } from '../../constants/cereals'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): void {
  res.status(200).json(cereals)
}

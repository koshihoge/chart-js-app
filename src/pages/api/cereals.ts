// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { cereals } from '@prisma/client'
import nextconnect from 'next-connect'

const handler = nextconnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(500).end('Internal Server Error')
  },
  onNoMatch(req, res) {
    res.status(404).end('Page is not found')
  },
}).use((req, _, next) => {
  next()
})

interface ExtendGetResponse extends NextApiResponse {
  body: {
    cereals: cereals[]
  }
}
handler.get(async (_, res: ExtendGetResponse) => {
  const data = await prisma.cereals.findMany()
  res.status(200).json(data)
})

interface ExtendPostRequest extends NextApiRequest {
  body: cereals
}

interface ExtendPostResponse extends NextApiResponse {
  body: {
    cereals: cereals
  }
}

handler.post<ExtendPostRequest, ExtendPostResponse>(
  // eslint-disable-next-line complexity
  async (req: ExtendPostRequest, res: ExtendPostResponse) => {
    const cereal = await prisma.cereals.findFirst({
      where: {
        id: req.body.id,
      },
    })

    if (cereal == null) {
      res.status(404).json('cereal not found.')
    } else {
      const updateCereal = {
        id: cereal.id,
        name: req.body.name ?? cereal.name,
        mfr: req.body.mfr ?? cereal.mfr,
        type: req.body.type ?? cereal.type,
        calories: req.body.calories ?? cereal.calories,
        protein: req.body.protein ?? cereal.protein,
        fat: req.body.fat ?? cereal.fat,
        sodium: req.body.sodium ?? cereal.sodium,
        fiber: req.body.fiber ?? cereal.fiber,
        carbo: req.body.carbo ?? cereal.carbo,
        sugars: req.body.sugars ?? cereal.sugars,
        potass: req.body.potass ?? cereal.potass,
        vitamins: req.body.vitamins ?? cereal.vitamins,
        shelf: req.body.shelf ?? cereal.shelf,
        weight: req.body.weight ?? cereal.weight,
        cups: req.body.cups ?? cereal.cups,
        rating: req.body.rating ?? cereal.rating,
      }

      await prisma.cereals.update({
        where: {
          id: updateCereal.id,
        },
        data: updateCereal,
      })
      res.status(200).json(updateCereal)
    }
  }
)

export default handler

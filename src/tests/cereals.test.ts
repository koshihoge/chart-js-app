import { cereals } from '@prisma/client'
import { testApiHandler } from 'next-test-api-route-handler'
import handler from '../pages/api/cereals'

const orgCereal: cereals = {
  calories: 70,
  carbo: 5,
  cups: 0.33,
  fat: 1,
  fiber: 10,
  id: 1,
  mfr: 'N',
  name: '100% Bran',
  potass: 280,
  protein: 4,
  rating: 68.402973,
  shelf: 3,
  sodium: 130,
  sugars: 6,
  type: 'C',
  vitamins: 25,
  weight: 1,
}

describe('next-test-api-route-handler test', () => {
  test('cereals-test GET', async () => {
    expect.hasAssertions()
    await testApiHandler({
      requestPatcher: req => (req.url = '/api/cereals'),
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'GET',
        })

        const response: cereals[] = await res.json()
        expect(response.filter(c => c.id === 1)).toStrictEqual([orgCereal])
      },
    })
  })
  test('cereals-test POST', async () => {
    expect.hasAssertions()
    await testApiHandler({
      requestPatcher: req => (req.url = '/api/cereals'),
      handler,
      test: async ({ fetch }) => {
        const postCereal: cereals = {
          calories: 700,
          carbo: 50,
          cups: 3.33,
          fat: 10,
          fiber: 100,
          id: 1,
          mfr: 'NN',
          name: '100% BranN',
          potass: 2800,
          protein: 40,
          rating: 684.02973,
          shelf: 30,
          sodium: 1300,
          sugars: 60,
          type: 'CC',
          vitamins: 250,
          weight: 10,
        }

        const res = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(postCereal),
        })

        // Rollback
        await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(orgCereal),
        })

        expect(await res.json()).toStrictEqual(postCereal)
      },
    })
  })
})

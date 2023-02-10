import Head from 'next/head'
import { Inter } from '@next/font/google'
import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { Cereal } from '@/constants/cereals'
import { GetServerSideProps } from 'next'
import { LayoutPosition } from 'chart.js'
import 'chart.js/auto'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({ subsets: ['latin'] })

type Props = {
  cereals: Cereal[]
}

const Home = (props: Props): JSX.Element => {
  const cereals = props.cereals.map((cereal: Cereal) => {
    return { x: cereal.calories, y: cereal.carbo }
  })

  const data = {
    datasets: [
      {
        label: cereals.length + ' Cereals',
        backgroundColor: 'rgb(255, 99, 132)',
        data: cereals,
      },
    ],
  }

  const position: LayoutPosition = 'bottom'

  const options = {
    plugins: {
      legend: {
        position: position,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Calories',
          font: {
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Carbo',
          font: {
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
    },
  }

  return (
    <>
      <Head>
        <title>chart-js-app</title>
        <meta name="description" content="Chart.jsで散布図を表示するアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section style={{ padding: '10pt' }}>
          <h1>chart-js-app</h1>
          <p>シリアルのデータ</p>
          <div style={{ width: '400pt' }}>
            <Scatter data={data} options={options} width={300} height={300} />
          </div>
        </section>
      </main>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async _context => {
  const response = await fetch('http://localhost:3000/api/cereals')
  const cereals: Cereal[] = await response.json()
  return {
    props: { cereals },
  }
}

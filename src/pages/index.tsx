import Head from 'next/head'
import { Inter } from '@next/font/google'
import React, { ChangeEvent, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Cereal,
  CerealTypeParameterName,
  CerealValueParameterName,
  cerealValueParameterNames,
} from '@/constants/cereals'
import { GetServerSideProps } from 'next'
import { LayoutPosition } from 'chart.js'
import 'chart.js/auto'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({ subsets: ['latin'] })

type Props = {
  cereals: Cereal[]
}

const Home = (props: Props): JSX.Element => {
  const [xCerealParameter, setXCerealParameter] =
    useState<CerealValueParameterName>('calories')
  const [yCerealParameter, setYCerealParameter] =
    useState<CerealValueParameterName>('carbo')

  const [mfrCerealParameter, setMfrCerealParameter] = useState<
    CerealTypeParameterName | ''
  >('')
  const [typeCerealParameter, setTypeCerealParameter] = useState<
    CerealTypeParameterName | ''
  >('')

  const mfrs = new Set(props.cereals.map((element, _) => element.mfr))
  const types = new Set(props.cereals.map((element, _) => element.type))

  const cereals = props.cereals
    .filter((cereal: Cereal) => {
      return (
        (mfrCerealParameter === '' || mfrCerealParameter === cereal.mfr) &&
        (typeCerealParameter === '' || typeCerealParameter === cereal.type)
      )
    })
    .map((cereal: Cereal) => {
      return { x: cereal[xCerealParameter], y: cereal[yCerealParameter] }
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
          text: xCerealParameter,
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
          text: yCerealParameter,
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

  const changeXCerealParameter = (e: ChangeEvent<HTMLSelectElement>): void => {
    setXCerealParameter(e.target.value as CerealValueParameterName)
  }

  const changeYCerealParameter = (e: ChangeEvent<HTMLSelectElement>): void => {
    setYCerealParameter(e.target.value as CerealValueParameterName)
  }

  const changeMfrCerealParameter = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    setMfrCerealParameter(e.target.value as CerealTypeParameterName | '')
  }

  const changeTypeCerealParameter = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    setTypeCerealParameter(e.target.value as CerealTypeParameterName | '')
  }

  const selectCerealValueOptions = cerealValueParameterNames.map(
    (element, i) => (
      <option key={i} value={element}>
        {element}
      </option>
    )
  )

  const refineCerealValueOptions = (values: Set<string>): JSX.Element => {
    return (
      <>
        <option value={''}></option>
        {Array.from(values).map((element, i) => (
          <option key={i} value={element}>
            {element}
          </option>
        ))}
      </>
    )
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
          <div>
            <span className="selectboxCaption">x軸</span>
            <select value={xCerealParameter} onChange={changeXCerealParameter}>
              {selectCerealValueOptions}
            </select>
            <span className="captionSpacing"></span>
            <span className="selectboxCaption">y軸</span>
            <select value={yCerealParameter} onChange={changeYCerealParameter}>
              {selectCerealValueOptions}
            </select>
          </div>
          <div>
            <span className="selectboxCaption">mfr</span>
            <select
              value={mfrCerealParameter}
              onChange={changeMfrCerealParameter}>
              {refineCerealValueOptions(mfrs)}
            </select>
            <span className="captionSpacing"></span>
            <span className="selectboxCaption">type</span>
            <select
              value={typeCerealParameter}
              onChange={changeTypeCerealParameter}>
              {refineCerealValueOptions(types)}
            </select>
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

import {createCanvas} from 'canvas'
import {readFileSync} from 'fs'
// @ts-ignore
import * as echarts from 'echarts'
import express from 'express'
import { join } from 'path'

const width = 640
const height = 480
echarts.setPlatformAPI({
  createCanvas: () => {
    return createCanvas(width, height) as unknown
  },
})


const server = express()

server.get('/svg', (req, res) => {
  const options = JSON.parse(readFileSync(join(import.meta.dirname, 'options.json'), 'utf8'))
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width,
    height,
  })
  chart.setOption(options)
  const svg = chart.renderToSVGString()
  chart.dispose()
  res.type('svg').send(svg)
})

server.get('/png', (req, res) => {
  const options = JSON.parse(readFileSync(join(import.meta.dirname, 'options.json'), 'utf8'))
  const canvas = createCanvas(width, height)
  const chart = echarts.init(canvas)
  chart.setOption(options)
  const buffer = canvas.toBuffer()
  chart.dispose()
  res.type('png').send(buffer)
})

server.listen(3000)

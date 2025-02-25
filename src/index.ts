import {createCanvas} from 'canvas'
// @ts-ignore
import * as echarts from 'echarts'
import express from 'express'

const options = {
  legend: {
    orient: 'vertical',
    left: 0,
    type: 'scroll',
    selector: false,
    selectorLabel: {
      color: '#1890ff',
      borderColor: '#1890ff',
      width: 32,
      height: 16,
      align: 'center',
      verticalAlign: 'middle',
    },
    selected: {},
    tooltip: {
      show: true,
    },
  },
  grid: {
    bottom: '30%',
    top: 80,
    left: 150,
  },
  xAxis: [
    {
      data: [
        '1193,ISTANDBY,0,3',
        '376,P2,1.1,1.3',
        '1132,P17_FREQ,3.7,4.1',
        '395,P7,2.2,2.6',
        '1119,P15_FREQ,3.7,4.1',
        '其它',
      ],
      axisLine: {
        onZero: false,
      },
      axisLabel: {
        rotate: 40,
      },
    },
  ],
  yAxis: [
    {
      canSet: true,
      type: 'value',
      id: '失效率',
      name: '失效率',
      position: 'left',
      axisLabel: {
        show: true,
        showMinLabel: true,
        showMaxLabel: true,
      },
    },
    {
      canSet: true,
      type: 'value',
      id: '累计百分比',
      name: '累计百分比',
      position: 'right',
      min: 0,
      max: 100,
      axisLabel: {
        show: true,
        showMinLabel: true,
        showMaxLabel: true,
      },
    },
  ],
  series: [
    {
      name: '失效率',
      type: 'bar',
      data: [
        1.573540280857354, 0.06947524020694752, 0.0672579453067258, 0.06577974870657798, 0.0565410199556541,
        0.1622320768662232,
      ],
      barMaxWidth: 100,
      emphasis: {
        label: {
          show: true,
        },
      },
      label: {
        show: true,
        position: 'top',
      },
    },
    {
      name: '累计百分比',
      type: 'line',
      data: [78.88106706187476, 82.36383845868839, 85.73545757688032, 89.0329751759911, 91.86735828084474, 100],
      yAxisIndex: 1,
      emphasis: {
        label: {
          show: true,
        },
      },
      label: {
        show: true,
      },
      markLine: {
        symbol: 'none',
        silent: true,
        lineStyle: {
          type: 'dashed',
        },
        label: {
          distance: 45,
        },
        data: [
          {
            yAxis: 90,
            lineStyle: {
              color: '#f5222d',
            },
          },
        ],
      },
    },
  ],
}

const server = express()

server.get('/svg', (req, res) => {
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: 640,
    height: 480,
  })
  chart.setOption(options)
  const svg = chart.renderToSVGString()
  chart.dispose()
  res.type('svg').send(svg)
})

server.get('/png', (req, res) => {
  const canvas = createCanvas(640, 480)
  const chart = echarts.init(canvas)
  chart.setOption(options)
  const buffer = canvas.toBuffer()
  chart.dispose()
  res.type('png').send(buffer)
})

server.listen(3000)

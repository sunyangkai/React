import * as echarts from 'echarts/core'

import {
    CandlestickSeriesOption,
    LineSeriesOption,
  } from 'echarts/charts'

import { CandlestickChart, LineChart} from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import {
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption,
    LegendComponentOption,
    DataZoomComponentOption,
    MarkLineComponentOption,
    MarkPointComponentOption,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent,
  } from 'echarts/components'
  
type EChartsOption = echarts.ComposeOption<
| TitleComponentOption
| TooltipComponentOption
| GridComponentOption
| LegendComponentOption
| DataZoomComponentOption
| MarkLineComponentOption
| MarkPointComponentOption
| CandlestickSeriesOption
| LineSeriesOption
>


const upColor = '#ec0000'
const upBorderColor = '#8A0000'
const downColor = '#00da3c'
const downBorderColor = '#008F28'


export const splitData = (rawData: (number | string)[][]) => {
    const categoryData = []
    const values = []
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0])
        values.push(rawData[i])
    }
    return {
      categoryData: categoryData,
      values: values,
    }
}

export const getOption = (data, { name }) => {
    const calculateMA = (dayCount: number) => {
        var result = []
        for (var i = 0, len = data.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-')
            continue
          }
          var sum = 0
          for (var j = 0; j < dayCount; j++) {
            sum += +data.values[i - j][1]
          }
          result.push(sum / dayCount)
        }
        console.log(data.values[i - j], result)
        return result
    }
    const dayCount =20;
    const BolinUp = () => {
      var result = []
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i <= dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) sum += +data.values[i - j][1];
        const MB = (sum - +data.values[i - 1][1] + +data.values[i - dayCount][1]) / dayCount; //
        const MA = sum / dayCount;
        let summd = 0;
        for (let k = 0; k < dayCount; k++) {
          const C = data.values[i - k][1];
          summd = summd + (C - MA)*(C - MA)
        }
        const MD = Math.sqrt(summd / dayCount);
        const UP = MB + 2 * MD;
        result.push(UP)
      }
      return result
    }

    const BolinDown = () => {
      var result = []
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i <= dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) sum += +data.values[i - j][1];
        const MB = (sum - +data.values[i - 1][1] + +data.values[i - dayCount][1]) / dayCount; //
        const MA = sum / dayCount;
        let summd = 0;
        for (let k = 0; k < dayCount; k++) {
          const C = data.values[i - k][1];
          summd = summd + (C - MA)*(C - MA)
        }
        const MD = Math.sqrt(summd / dayCount);
        const UP = MB - 2 * MD;
        result.push(UP)
      }
      return result
    }
    

    const option: EChartsOption = {
        title: {
          text: name,
          left: '45%',
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const dataKline = params[0];
           // 开盘 收盘 最高 最低 成交量（元） 成交额（元）涨跌额(元) 涨跌幅(%)  换手率(%) 总市值 流通市值
            const [, begin, end, highest, lowst, dealMount, dealValue, riseValue, risePercent, changeRate, totalValue, flowValue] = dataKline.value;
            const date = dataKline.axisValue;
            return (
                '<br>' +
                '日期:' + date + '<br>' +
                '开盘价:' +  begin + '<br>' +
                '收盘价:' +  end +'<br>' +
                '最低价:' +  lowst + '<br>' +
                '最高价:' +  highest + '<br>' +
                '成交量:' +  Number(dealMount/10000).toFixed(2) + '万<br>' +
                '成交额:' +  Number(dealValue/100000000).toFixed(2) + '亿<br>' +
                '涨跌幅:' +  risePercent + '%<br>' +
                '涨跌额:' +  riseValue + '<br>' +
                '换手率:' +  changeRate + '%<br>' +
                '总市值:' +  totalValue + '<br>' + 
                '流通市值:' +  flowValue + '<br>'
            )
          },
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['日K', 'MA5',  'MA10', 'MA20', '布林通道(上)', '布林通道(下)'],
          left: 0
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
        },
        xAxis: {
          type: 'category',
          data: data.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
          },
          {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
            end: 100,
          },
        ],
        series: [
          {
            name: '日K',
            type: 'candlestick',
            data: data.values,
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor,
            },
            
            markPoint: {
              label: {
                formatter: function (param: any) {
                  return param != null ? Math.round(param.value) + '' : ''
                },
              },
              data: [
                {
                  name: 'Mark',
                  coord: ['2021/5/31', 2300],
                  value: 40,
                  itemStyle: {
                    color: 'rgb(41,60,85)',
                  },
                },
                {
                  name: 'highest value',
                  type: 'max',
                  valueDim: 'highest',
                },
                {
                  name: 'lowest value',
                  type: 'min',
                  valueDim: 'lowest',
                },
                {
                  name: 'average value on close',
                  type: 'average',
                  valueDim: 'close',
                },
              ],
              tooltip: {
                formatter: function (param: any) {
                  return param.name + '<br>' + (param.data.coord || '')
                },
              },
            },
            markLine: {
              symbol: ['none', 'none'],
              data: [
                [
                  {
                    name: 'from lowest to highest',
                    type: 'min',
                    valueDim: 'lowest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false,
                    },
                    emphasis: {
                      label: {
                        show: false,
                      },
                    },
                  },
                  {
                    type: 'max',
                    valueDim: 'highest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false,
                    },
                    emphasis: {
                      label: {
                        show: false,
                      },
                    },
                  },
                ],
                {
                  name: 'min line on close',
                  type: 'min',
                  valueDim: 'close',
                },
                {
                  name: 'max line on close',
                  type: 'max',
                  valueDim: 'close',
                },
              ],
            },
          },
          {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          // {
          //   name: 'MA30',
          //   type: 'line',
          //   data: calculateMA(30),
          //   smooth: true,
          //   lineStyle: {
          //     opacity: 0.5,
          //   },
          // },
          {
            name: '布林通道(上)',
            type: 'line',
            data: BolinUp(),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: '布林通道(下)',
            type: 'line',
            data: BolinDown(),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
        ],
    }
    
    return option;

}


export const useCharts = () => {
    echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        DataZoomComponent,
        MarkLineComponent,
        MarkPointComponent,
        CandlestickChart,
        LineChart,
        CanvasRenderer,
        UniversalTransition,
      ]);
}


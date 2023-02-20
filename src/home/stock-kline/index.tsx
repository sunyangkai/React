import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
// import dayjs from 'dayjs'
import { cloneDeep } from 'loadsh'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker; 
import * as echarts from 'echarts/core'

import { splitData, getOption, useCharts } from './kline-option';
import {  useStockData2 } from './data';
import moment, { Moment } from 'moment';
import { decodeQuery } from '../../util/param'

// const deal = (source) => {
//   const klineData = source.map(arr => {
//     const filterArr = arr.filter(a => !!a);
//     const resArr = filterArr.map((d, index) => {
//       if (index === 0) {
//         return moment(d).format('YYYY/M/DD');
//       } else if (index === 1) {
//         return d.slice(1, -1)
//       } else if (index === 2) {
//         return d;
//       } else {
//         return parseFloat(d)
//       }
//     });
//     resArr.splice(1, 2);
//     return resArr;
//   });
//   klineData.reverse();
//   return klineData;
// }
// 开盘 收盘 最高 最低 成交量（元） 成交额（元）涨跌额(元) 涨跌幅(%)  换手率(%) 总市值 流通市值
const deal2 = (arr) => {
  const newarr = arr.map(a => [
    moment(a.stock_date).format('YYYY/M/DD'),
    a.start_price,
    a.end_price,
    a.max_price,
    a.min_price,
    a.deal_mount,
    a.deal_value,
    a.rise_value,
    a.rise_percent,
    a.change_rate,
    a.total_value,
    a.flow_value
  ])
  newarr.sort((a, b) => {
    return new Date(a[0]).valueOf() - new Date(b[0]).valueOf()
  });
  return newarr;
}
const Kline = () => {
  const [dates, setDates] = useState<[Moment, Moment]>([moment().day(-30 * 6), moment()]);
  const location = useLocation();
  const { code , name } = decodeQuery(location.search);
  const source2 = useStockData2(code, dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD'))
  const klineData = deal2(source2);
  useMemo(() => {
    useCharts()
  }, [])

  const chartsData = splitData(cloneDeep(klineData))
  const option = getOption(chartsData, { name })


  const onChange = (dates) => {
    setDates(dates)
  }
  useLayoutEffect(() => {
    const myChart = echarts.init(document.getElementById('main'))
    myChart.setOption(option)
  }, [chartsData])

  return (
    <div>
      <RangePicker style={{
        position: 'absolute',
        right: '10px',
        zIndex: '9'

      }} value={dates} onChange={onChange} />
      <div id='main' style={{ height: '780px', width: '100%' }} />
    </div>
  )
}

export default Kline

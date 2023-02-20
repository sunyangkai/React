import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'http://33.push2.eastmoney.com/api/qt/clist/get?po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1639281809383';

const cb = 'jQuery11240783574646583348_1639281809188';

/*
 f12: 股票代码
 f14: 股票名称
 f2: 最新价
 f3: 涨跌幅(%)
 f4: 涨跌额
 f5: 成交量(手)
 f6: 成交额
 f7: 振幅
 f8: 换手率(%)
 f9: 市盈率

 f15: 最高
 f16: 最低
 f17: 今开
 f18: 昨收
 f10: 量比
 
 f23: 市净率

*/

const defaultParam = { pn: 1, pz: 20 };

interface Params {
    pz?: number;
    pn?: number;
}
interface Diff {
    f12: string
    f14: string
    f2: number
    f3: number // 涨跌幅(%)
    f4: number // 涨跌额
    f5: number // 成交量(手)
    f6: number // 成交额
    f7: number // 振幅
    f8: number // 换手率(%)
    f9: number // 市盈率
   
    f15: number // 最高
    f16: number // 最低
    f17: number // 今开
    f18: number // 昨收
    f10: number // 量比
    
    f23: number // 市净率
}
interface Data {
    diff: Diff[],
    total: number
}
interface Response {
    data: Data
}

const useShangZhengData = (params?: Params): Response => {
    const p = params || defaultParam;
    const { pn, pz } = p;
    const [data, setData] = useState({
        data: {
            diff: [],
            total: 0
        }
    });
    useEffect(() => {
        axios.get('http://0.0.0.0:8080/exchange3')
        // axios.get('http://0.0.0.0:8080/east', {
        //     headers: { 'Content-Type': 'text/html;charset=utf-8"' },
        // })
        // // axios.get('http://0.0.0.0:8080/get-all')

        // axios.get('http://0.0.0.0:8080/inset-kline-data')
        // axios.get('http://0.0.0.0:8080/caculateMa20')
        axios.get(url, {
            headers: { 'Content-Type': 'text/html;charset=utf-8"' },
            params: {
                cb,
                pn,
                pz
            }
        }).then(res => {
            const resStr = res.data;
            const arr = resStr.split(cb);
            const JsonData = JSON.parse(arr[1].slice(1, -2));
            setData(JsonData);
        })
    }, [pn, pz]);
    return data; 
}


export { useShangZhengData }
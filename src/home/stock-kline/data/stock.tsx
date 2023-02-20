import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'http://0.0.0.0:8080/get-stock-detail';
const url2 = 'http://0.0.0.0:8080/get-my-stock-detail'


const useStockData = (code, start, end): (string)[][] => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(url, {
            params: {
                code,
                start,
                end
            }
        }).then(res => {
            const s = res.data
            const arr = s.split(';')
            const source = arr.map(a => {
                return a.split(',')
            })
            setData(source);
        });
    }, [code, start, end]);
    return data; 
}



const useStockData2 = (code, start, end): any[] => {
    const [data, setData] = useState([]);
    console.log(code, start, end)
    useEffect(() => {
        axios.get(url2, {
            params: {
                code,
                start,
                end,
            }
        }).then(res => {
            setData(res.data);
        });
    }, [code, start, end]);
    return data; 
}

export { useStockData, useStockData2 }
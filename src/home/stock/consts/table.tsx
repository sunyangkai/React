import React from 'react';

export const getColums = ({
    goDetail,
}) => {
    return [
        { 
            title: '股票代码', 
            key: 'f12', 
            dataIndex: 'f12',
            with: 300,
            fixed: 'left',
        },
        { 
            title: '股票名称', 
            key: 'f14', 
            dataIndex: 'f14',
            with: 400,
            fixed: 'left',
            render: (item: number, all) => {
                return <span className="pointer" onClick={goDetail.bind(this,  all.f12, all.f14)} style={{ width: '200px', color: 'red' }}>{item}</span>
            },
        },
        { title: '最新价', key: 'f2', dataIndex: 'f2'},
        { title: '涨跌幅(%)', key: 'f3', dataIndex: 'f3' },
        { title: '涨跌额', key: 'f4', dataIndex: 'f4' },
        { title: '成交量', key: 'f5', dataIndex: 'f5' },
        { title: '成交额(万）', key: 'f6', dataIndex: 'f6' },
        { title: '振幅', key: 'f7', dataIndex: 'f7' },
        { title: '换手率(%)', key: 'f8', dataIndex: 'f8' },
        { title: '市盈率', key: 'f9', dataIndex: 'f9' },
        { title: '最高', key: 'f15', dataIndex: 'f15' },
        { title: '最低', key: 'f16', dataIndex: 'f16' },
        { title: '今开', key: 'f17', dataIndex: 'f17' },
        { title: '昨收', key: 'f18', dataIndex: 'f18' },
        { title: '量比', key: 'f10', dataIndex: 'f10' },
        { 
            title: '市净率', 
            with: 150,
            key: 'f23', 
            dataIndex: 'f23',
            fixed: 'right',
        },
    ];    
}
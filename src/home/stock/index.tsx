import React, { useState } from 'react'
import { useShangZhengData } from '../stock-kline/data/shangzheng'
import { Table } from 'antd'

import './index.less'
import { getColums } from './consts/table';

import { useHistory } from "react-router-dom";
import { encodeQuery } from '../../util/param'
import { Show } from 'src/common/show'


const Kline = () => {
  const history = useHistory();
  const [pagination, setPagination] = useState({
    pageSize: 20,
    current: 1,
  });

  const shangzheng = useShangZhengData({ pn: pagination.current, pz: pagination.pageSize })
  const data = shangzheng.data.diff;
  const dataSource = data.map(d => ({ 
    ...d, 
    f6: Math.round(d.f6 / 10000),
    key: d.f12 
  }));
  const total = shangzheng.data.total;

  const goDetail = (code, name) => {
    history.push({
        pathname: '/kline',
        search: encodeQuery({
            code,
            name
        })
    })
  };
  const columns = getColums({ goDetail });

  

  return (
    <div className="stock">
      <Show />
      <Table 
        className="stock-table"
        dataSource={dataSource} 
        columns={columns as any}
        scroll={{ x: 1600 }}
        pagination={{
            ...pagination,
            total,
            onChange: (current, pageSize) => setPagination(pre => ({ ...pre, current, pageSize })),
        }}
    />
    </div>
  )
}

export default Kline

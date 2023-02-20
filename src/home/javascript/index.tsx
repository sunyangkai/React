// @ts-nocheck
import * as React from 'react'
import honey_img from '../../imgs/honey.jpeg';
import min1 from '../../imgs/min1.png';
import commen from '../../imgs/commen.png';
import $ from 'jquery';
import { Show } from 'src/common/show'
import { Mine } from 'src/common/mine'




import './index.less'

// import { test_symbol } from './page/var'
import { test_function } from './page/function'
import { array_test } from './page/array'
// import { test_obj } from './page/var'
import { test_object } from './page/object'
import { class_test } from './page/class'

const Javascript = () => {
  // test_object();
  // array_test();
  // class_test()
  test_function()

  const fixArr = [2, 4]
  const data = []
  const text = '看这里: this-is-javascript';
  console.log(text)
  return (
       <div>
         <img style={{ width: '100px' }} src={honey_img} ></img>
         <img src={min1} ></img>
         <img className='move' src={commen} ></img>
         <p>这是一句话</p>
         <Show />
         <Mine />
       </div>
  )
}

export default Javascript;

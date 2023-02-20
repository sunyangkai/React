// @ts-nocheck
import * as React from 'react'




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
         <p>这是一句话</p>
       </div>
  )
}

export default Javascript;

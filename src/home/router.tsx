import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Javascript from './javascript'
import Hooks from './hooks'
import Stock from './stock'
import StockKline from './stock-kline'

const RouteContainer = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/hooks' render={() => <Hooks />} />
      <Route exact path='/react' render={() => <Javascript />} />
      <Route exact path='/stock' render={() => <Stock />} />
      <Route exact path='/kline' render={() => <StockKline />} />
      <Route exact path='/' render={() => <Hooks />} />
    </Switch>
  </BrowserRouter>
)

export { RouteContainer }

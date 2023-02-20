import React from 'react'
import { Route, Switch, BrowserRouter, HashRouter } from 'react-router-dom'

import Javascript from './javascript'
import Hooks from './hooks'

// 本地用hash路由，多页入口浏览器不能区分路径
const RouteContainer = () => (
  <HashRouter basename="/page2">
    <Switch>
      <Route exact path='/hooks' render={() => <Hooks />} />
      <Route exact path='/react' render={() => <Javascript />} />
      <Route exact path='/' render={() => <Hooks />} />
    </Switch>
  </HashRouter>
)

export { RouteContainer }

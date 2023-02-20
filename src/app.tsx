import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './home/redux'
import { RouteContainer } from './home/router';
import './index.less'

const MOUNT_NODE = document.getElementById('wrap');

const AppContainer = () => (
    <Provider store={store}>
       <RouteContainer />
    </Provider>
)

const render = () => {
   ReactDOM.render(<AppContainer />, MOUNT_NODE)
}

export default render

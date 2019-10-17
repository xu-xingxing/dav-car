import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.js'

import { createStore,applyMiddleware } from 'redux'

import reducer from './reducers/all.js'

import { Provider } from 'react-redux'
import logger from 'redux-logger'

import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas/rootSaga.js'

//创建saga中间件
const sagaMiddleware = createSagaMiddleware()
//创建store
const store = createStore(reducer,applyMiddleware(logger,sagaMiddleware))

//运行saga
sagaMiddleware.run(rootSaga)
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.querySelector('#app')
)
import React from 'react'
import reactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import initialState from './state'

import Root from './containers/Root'

const store = createStore(reducer, initialState, applyMiddleware(thunk))

reactDom.render(
	<Root store={store} />, document.querySelector('main')
)

console.log('welcome to clientSide')

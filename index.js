import React from 'react'
import { AppRegistry } from 'react-native'
import createLoading from 'dva-loading'
import { autoRehydrate } from 'redux-persist';
import dva from './app/utils/dva'
import Router, { routerMiddleware } from './app/router'
import dashboard from './app/models/dashboard'
import routerModel from './app/models/router'
import loginModel from './app/models/login'
import appModel from './app/models/app'
import globalModal from './app/models/global'

const app = dva({
  initialState: {},
  models: [dashboard, routerModel, loginModel, appModel, globalModal],
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
  extraEnhancers: [autoRehydrate()],
})
app.use(createLoading());
const App = app.start(<Router store={app._store} />)

AppRegistry.registerComponent('nodecap', () => App)

export default app._store
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
import { compose, createStore } from 'redux'

const persistConfig = {
  key: 'root',
  storage,
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  // composeEnhancers
  const store = createStore(persistedReducer, composeEnhancers())
  const persistor = persistStore(store)
  return { store, persistor }
}

import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { settingsReducer } from './reducer'

const persistSettings = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['settings'],
}

const reducer = persistReducer(persistSettings, settingsReducer)

export type ApplicationState = ReturnType<typeof reducer>

const store = createStore(reducer, applyMiddleware(thunk))
const persistor = persistStore(store)

export { store, persistor }

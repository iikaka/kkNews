import { legacy_createStore as createStore, combineReducers } from 'redux'
import { CollapsedReducer } from './reducers/CollapsedReducers'
import { LoadingReducer } from './reducers/LoadingReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // 保存到localstore 中

const persistConfig = { //创建一个配置给persistedReducer使用
    key: 'root',
    storage,
    blacklist:['LoadingReducer']
}

const reducer = combineReducers({
    CollapsedReducer,
    LoadingReducer
})

const persistedReducer = persistReducer(persistConfig, reducer) //通过persistedReducer做持久化，按照一定的配置 存到localStorag中



const store = createStore(persistedReducer)
const persistor = persistStore(store)
export {
    store,
    persistor
}
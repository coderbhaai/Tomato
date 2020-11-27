import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import isAdmin from './middleware/isAdmin'

// function saveToLocalStorage(state){
//     try{
//         const serializedState = JSON.stringify(state)
//         localStorage.setItem('state', serializedState)
//     } catch(e){
//         console.log(e)
//     }
// }

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)
const initialstate = {}

const middleware = [thunk]
const store = createStore( persistedReducer, initialstate,
    compose( applyMiddleware(...middleware ), 
    
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
    
    )
)

// store.subscribe(()=>saveToLocalStorage(store.getState()))

const persistor = persistStore(store)
export { store, persistor } 
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";

import reduxMiddlewear from "redux-thunk";
import appReducer from "./app-reducer";

let reducers = combineReducers({
    app: appReducer,
})


const store = createStore(reducers, applyMiddleware(reduxMiddlewear));
export default store;
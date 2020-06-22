import { combineReducers } from "redux"
import data from './data';

export const createAppReducer = history =>
    combineReducers({
        data
    })

export default createAppReducer
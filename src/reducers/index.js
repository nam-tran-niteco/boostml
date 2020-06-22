import { combineReducers } from "redux"
import data from './data';
import favorite from './favorite';

export const createAppReducer = history =>
    combineReducers({
        data,
        favorite
    })

export default createAppReducer
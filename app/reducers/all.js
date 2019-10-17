import { combineReducers } from 'redux';
import carReducer from './carReducer.js'

export default combineReducers({
    car:carReducer
})
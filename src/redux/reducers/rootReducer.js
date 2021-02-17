import {combineReducers} from 'redux'
import carReducer from './reducer'

const rootReducer = combineReducers({
    carsStore: carReducer
})

export default rootReducer;

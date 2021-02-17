import { all } from 'redux-saga/effects'
import {
  watchCreateCar,
  watchFetchCars,
  watchUpdateCar,
  watchDeleteCar,
} from './saga'

export default function* rootSaga() {
  yield all([
    watchFetchCars(),
    watchDeleteCar(),
    watchCreateCar(),
    watchUpdateCar(),
  ])
}
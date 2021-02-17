import { takeLatest, put, takeEvery, call } from "redux-saga/effects";
import {
    createCarApi,
    getCarsApi,
    deleteCarApi,
    updateCarApi,
    getFilterCarsApi,
} from "../../api/api";
import { actionCreators } from "../actions/actionCreators";
import {
    CREATE_CAR,
    CREATE_CAR_FAILURE,
    DELETE_CAR,
    DELETE_CAR_FAILURE,
    FETCH_FILTER,
    FETCH_FILTER_CARS_FAILURE,
    FETCH_CARS,
    FETCH_CARS_FAILURE,
    UPDATE_CAR,
    UPDATE_CAR_FAILURE,
} from "../actions/types";

export function* fetchCar() {
    try {
        const data = yield call(getCarsApi);
        yield put(actionCreators.retriveCars(data));
    } catch (error) {
        yield put({ type: FETCH_CARS_FAILURE });
    }
}

export function* watchFetchCars() {
    yield takeEvery(FETCH_CARS, fetchCar);
}
export function* createCar(action) {
    try {
        const data = yield call(createCarApi, action.payload);
        yield put(actionCreators.createCar(data));
        yield call(fetchCar);
    } catch (error) {
        yield put({ type: CREATE_CAR_FAILURE });
        console.error(error);
    }
}

export function* watchCreateCar() {
    yield takeEvery(CREATE_CAR, createCar);
}

export function* updateCar(action) {
    try {
        const data = yield call(updateCarApi, action.payload);
        yield put(actionCreators.updateCar(data));
        yield call(fetchCar);
    } catch (error) {
        yield put({ type: UPDATE_CAR_FAILURE });
        console.error(error);
    }
}

export function* watchUpdateCar() {
    yield takeLatest(UPDATE_CAR, updateCar);
}

export function* deleteCar(action) {
    try {
        const data = yield call(deleteCarApi, action.payload);
        console.log(":1:::2:::3:::4:::5:::6:");
        console.log(data);
        yield put(actionCreators.deleteCar(data));
        yield call(fetchCar);
    } catch (error) {
        console.log(":1:::2:::3:::4234234213423423:::5:::6:");
        console.log(error);
        yield put({ type: DELETE_CAR_FAILURE });
        console.error(error);
    }
}

export function* watchDeleteCar() {
    yield takeEvery(DELETE_CAR, deleteCar);
}

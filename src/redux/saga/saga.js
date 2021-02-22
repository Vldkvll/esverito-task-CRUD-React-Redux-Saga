import { takeLatest, put, takeEvery, call } from "redux-saga/effects";
import {
    createCarApi,
    getCarsApi,
    deleteCarApi,
    updateCarApi,
} from "../../api/api";
import { actionCreators } from "../actions/actionCreators";
import {
    CREATE_CAR,
    CREATE_CAR_FAILURE,
    DELETE_CAR,
    DELETE_CAR_FAILURE,
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
        yield call(updateCarApi, action.payload);
        yield put(actionCreators.updateCar(action.payload));
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
        yield call(deleteCarApi, action.payload);
        yield put(actionCreators.deleteCar(action.payload));
        yield call(fetchCar);
    } catch (error) {
        yield put({ type: DELETE_CAR_FAILURE });
        console.error(error);
    }
}

export function* watchDeleteCar() {
    yield takeEvery(DELETE_CAR, deleteCar);
}

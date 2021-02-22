import {
    CREATE_CAR_SUCCESS,
    DELETE_CAR_SUCCESS,
    FETCH_CARS_SUCCESS,
    UPDATE_CAR_SUCCESS,
    FETCH_CARS,
    DELETE_CAR,
    CREATE_CAR
} from "./types";

export const actionCreators = {

    fetchCars(data){
        return {
            type: FETCH_CARS,
            payload: data,
        }
    },

    retriveCars(data) {
        // debugger
        return {
            type: FETCH_CARS_SUCCESS,
            payload: data,
        }
    },
    deleteCarSaga(data) {
        // debugger
        return {
            type: DELETE_CAR,
            payload: data,
        }
    },
    deleteCar(data) {
        // debugger
        return {
            type: DELETE_CAR_SUCCESS,
            payload: data,
        }
    },
    createCarSaga(data) {
        return {
            type: CREATE_CAR,
            payload: data,
        }
    },
    createCar(data) {
        return {
            type: CREATE_CAR_SUCCESS,
            payload: data,
        }
    },
    updateCar(data) {
        return {
            type: UPDATE_CAR_SUCCESS,
            payload: data,
        }
    },
}
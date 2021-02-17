import {
    CREATE_CAR_SUCCESS,
    DELETE_CAR_SUCCESS,
    FETCH_FILTER_CARS_SUCCESS,
    FETCH_CARS_SUCCESS,
    UPDATE_CAR_SUCCESS,
    FETCH_CARS
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
    deleteCar(data) {
        return {
            type: DELETE_CAR_SUCCESS,
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

// export function retriveCars(data) {
//     return {
//         type: FETCH_CARS_SUCCESS,
//         payload: data,
//     }
// }

// export function deleteCar(data) {
//     return {
//         type: DELETE_CAR_SUCCESS,
//         payload: data,
//     }
// }

// export function createCar(data) {
//     return {
//         type: CREATE_CAR_SUCCESS,
//         payload: data,
//     }
// }

// export function updateCar(data) {
//     return {
//         type: UPDATE_CAR_SUCCESS,
//         payload: data,
//     }
// }

// export function retriveFilterCars(data) {
//     return {
//         type: FETCH_FILTER_CARS_SUCCESS,
//         payload: data,
//     }
// };
import {
    CREATE_CAR_FAILURE,
    CREATE_CAR_SUCCESS,
    DELETE_CAR_FAILURE,
    DELETE_CAR_SUCCESS,
    FETCH_CARS_FAILURE,
    FETCH_CARS_SUCCESS,
    UPDATE_CAR_FAILURE,
    UPDATE_CAR_SUCCESS,
} from "../actions/types";

let initialState = {
    cars: [
        // {
        //     "brand": "string",
        //     "carNumber": "string",
        //     "engineType": "FUEL",
        //     "id": 0,
        //     "model": "string"
        //   },
    ],
};

function carReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CARS_SUCCESS: {
            // console.log("FETCH_CARS_SUCCESS action.payload");
            // console.log(action.payload);
            return {
                ...state,
                cars: [...state.cars, ...action.payload],
            };
        }
        case FETCH_CARS_FAILURE:
            return {
                ...state,
                cars: [...state.cars],
            };
        case DELETE_CAR_SUCCESS: {
            // console.log("DELETE_CAR_SUCCESS action.payload");
            // console.log(action.payload);


            const car_id = action.payload;
            return {
                ...state,
                cars: state.cars.filter((car) => car.id !== car_id),
            };
        }
        case CREATE_CAR_SUCCESS: {

            return {
                ...state,
                cars: [...state.cars, action.payload],
            };
        }

        case UPDATE_CAR_SUCCESS: {
            const { id, ...rest } = action.payload;
            return {
                ...state,
                cars: state.cars.map((car) => {
                    if (car.id === id) {
                        return { ...car, ...rest };
                    }
                    return car;
                }),
            };
        }

        case CREATE_CAR_FAILURE:
        case DELETE_CAR_FAILURE:
        case UPDATE_CAR_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
}

export default carReducer;

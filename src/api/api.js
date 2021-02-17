import axios from 'axios';

const instance = axios.create({
    headers: {
        contentType: 'application/json'
    },
    baseURL: `https://test-backend.esverito.com/`,
    
})

export const getCarsApi = () => {
    return instance.get(`api/car/`)
        .then(function (response) {
            // console.log('response.data.cars')
            // console.log(response.data.cars)
            return response.data.cars
        })
}

export const createCarApi = (car) => {
    return instance.post(`car`, car)
        .then(response => response.data)
}

export const deleteCarApi = (id) => {
    return instance.delete(`/car/${id}`)
        .then(response => response.data)
}

export const updateCarApi = (car) => {
    return instance.put(`/car/${car.id}`)
}

// export const getFilterCarsApi = (data) => {
//     return instance.get(`/car/`,
//         {
//             params: data
//         })
//         .then(function (response) {
//             return response.data
//         })
// };
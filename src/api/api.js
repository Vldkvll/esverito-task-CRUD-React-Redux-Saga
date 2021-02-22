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
            return response.data.cars
        })
}

export const createCarApi = (car) => {
    return instance.post(`api/car`, car)
        .then(response => response.data)
}

export const deleteCarApi = (id) => {
    return instance.delete(`api/car/${id}`)
        .then(response => response.data)
}

export const updateCarApi = (car) => {
    return instance.put(`api/car/${car.id}`, car)
}

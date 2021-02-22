const array = ['GAS', 'HYBRID', 'FUEL'];

const  checkEngine = (data) => {
    if(array.includes(data)) return true
    return false
}


export default checkEngine;
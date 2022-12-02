import { API_URL } from '../helpers/const';

const getProducts = () => {

    const url = `${API_URL}product`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

}

export {
    getProducts,
}
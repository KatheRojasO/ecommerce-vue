import { API_URL } from '../helpers/const';

const create = (order) => {

    const url = `${API_URL}order`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(order)
      });

}

export {
    create,
}
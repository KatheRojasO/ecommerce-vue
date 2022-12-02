import Swal from 'sweetalert2';
import { KEY_CAR } from '../helpers/const';

const get = () => {
    
    const car = localStorage.getItem(KEY_CAR) ? JSON.parse(localStorage.getItem(KEY_CAR)) : [];
    return car;

}

const add = (product) => {

    const car = get();

    if (car.length === 0) {
        
        localStorage.setItem(KEY_CAR, JSON.stringify([...car, product]));

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado a tu carrito',
            showConfirmButton: false,
            timer: 2000
        });

    } else {

        const exists = car.find(c => c.id === product.id);

        if (exists) {
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto ya se encuentra en tu carrito',
                showConfirmButton: false,
                timer: 2000
            });

        } else {

            localStorage.setItem(KEY_CAR, JSON.stringify([...car, product]));

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado a tu carrito',
                showConfirmButton: false,
                timer: 2000
            });

        }

    }

}

const remove = (productId) => {

    const car = get();

    const exists = car.find(c => c.id === productId);

    if (exists) {

        const newCar = car.filter(c => c.id !== productId);
        localStorage.setItem(KEY_CAR, JSON.stringify(newCar));

    }
    
}

const addQuantity = (productId, quantity) => {
    
    const car = get();

    const newCar = car.map(product => {
            
        if (product.id === productId) {
            product.quantity = quantity;
        }

        return product;

    });

    localStorage.setItem(KEY_CAR, JSON.stringify(newCar));
    
}

const removeAll = () => {

    localStorage.removeItem(KEY_CAR);
    
}

export {
    get,
    add,
    remove,
    addQuantity,
    removeAll,
}
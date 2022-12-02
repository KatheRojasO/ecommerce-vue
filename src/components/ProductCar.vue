<template>
  <tr>
      <td><img class="car-image" :src="product.image" :alt="product.name" /></td>
      <td>{{ product.name }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.inventory }}</td>
      <td>
          <i @click="decreaseProduct" class="fas fa-minus"></i>
            <span class="content-quantity">
                {{ product.quantity ? product.quantity : 0 }} unidades
            </span>
            <i @click="increaseProduct" class="fas fa-plus"></i>
      </td>
      <td>
          <i @click="removeProduct" class="fas fa-trash-alt"></i>
      </td>
  </tr>
</template>

<script>
import { addQuantity, remove } from '../services/car';

export default {
    props: {
        product: {
            type: Object
        },
        reloadCarFun: {
            type: Function,
        }
    },
    setup(props) {

        const increaseProduct = () => {
            
            let { id, quantity = 0, inventory } = props.product;

            if (inventory > quantity) {
                quantity = quantity + 1;
                addQuantity(id, quantity);
                props.reloadCarFun();
            }

        }

        const decreaseProduct = () => {
            
            let { id, quantity = 0 } = props.product;

            if (quantity <= 0) {
                return;
            }

            quantity = quantity - 1;
            addQuantity(id, quantity);
            props.reloadCarFun();

        }

        const removeProduct = () => {
            remove(props.product.id);
            props.reloadCarFun();
        }

        return {
            increaseProduct,
            decreaseProduct,
            removeProduct
        }
    }
}
</script>

<style scoped>
.car-image {
    width: 100px !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.content-quantity {
    margin: 5px;
}
</style>
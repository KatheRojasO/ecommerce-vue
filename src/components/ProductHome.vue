<template>
  <div class="col">
          <div class="card">
            <img :src="product.image" class="card-img-top" alt="Logo">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <button @click="addCar" class="btn btn-danger btn-sm btn-fill">Add Car</button>
            </div>
          </div>
        </div>
</template>

<script>
import { add } from '../services/car';

export default {
    props: {
        product: {
            type: Object
        }
    },
    setup(props) {

      const addCar = () => {
        
        add(props.product);

      }

      return {
        addCar,
      }

    }
}
</script>

<style>
.btn-fill {
  width: 100%;
}
</style>
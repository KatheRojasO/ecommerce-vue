<template>
  <div class="container">
    <div class="card mt-4">
      <div class="card-header">
        Products car
      </div>
      <div class="card-body">
        <template v-if="products.length === 0">
          <p>No existen productos</p>
        </template>
        <template v-if="products.length > 0">
          <table class="table table-hover table-borderless">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Inventory</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="product in products" :key="product.id">
                  <ProductCar :product="product" :reloadCarFun="reloadCarFun" />
              </template>
            </tbody>
          </table>
          <button @click="buyNow" class="btn btn-warning btn-fill">Buy now</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { get, removeAll } from '../services/car';
import { create } from '../services/order';
import { ref, watchEffect } from 'vue';
import ProductCar from '../components/ProductCar.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    ProductCar
  },
  setup() {
    const products = ref([]);
    const reloadCar = ref(false);

    watchEffect(() => {
      
      reloadCar.value;

      products.value = get();

    });

    const reloadCarFun = () => {
      reloadCar.value = !reloadCar.value;
    }

    const buyNow = async () => {
      
      let totalPrice = 0;

      const ordersWithNoProducts = products.value.filter((product) => {
        if (product.quantity === 0 || typeof product.quantity == 'undefined') {
          return product;
        } else {
          totalPrice += product.price * product.quantity
        }    
      });

      if (ordersWithNoProducts.length > 0) {
        Swal.fire(
              'Oops...',
              'All products must have at least 1 article',
              'error'
            );
      } else {
        const email = await Swal.fire({
          title: 'Are you sure?',
          input: 'email',
          inputPlaceholder: 'Enter your email address',
          icon: 'warning',
          text: `The total of your purchase is ${totalPrice}. Please write your email to continue with the order.`,
          confirmButtonText: 'Yes, buy now!',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          showConfirmButton: true,
          showCancelButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              allowOutsideClick: false,
              text: 'Loading...'
            });
            
            Swal.showLoading();
            return result.value;
          } else if (result.isDenied || result.isDismissed) {
            return;
          }
        });

        if(typeof email !== 'undefined') {
          var order = {
            email: email,
            products: []
          };

          products.value.map(function(product) {        
            order.products.push({ 
                  "id" : product.id,
                  "quantity"  : product.quantity
              });
          });
          const resp = await create(order);

          if (resp.ok) {
            Swal.close();
            removeAll();
            reloadCarFun();
            Swal.fire(
              'Created!',
              'Your order has been created.',
              'success'
            );
          }

        }
      }


    }

    return {
      products,
      reloadCarFun,
      buyNow
    }

  }
}
</script>

<style scoped>
  .card-header {
    background: #de1822;
    color: white;
    font-size: 16px;
  }
</style>
<template>
  <div class="container">
    <div class="mt-2 mb-2 row row-cols-1 row-cols-md-5 g-4">
      <template v-for="product in products" :key="product.id">
        <Product :product="product" />
      </template>
    </div>
  </div>
</template>

<script>
import { getProducts } from '../services/product';
import { ref, onMounted }  from 'vue';
import Swal from 'sweetalert2';
import Product from '../components/ProductHome.vue';

export default {
  components: {
    Product
  },
  setup() {

    let products = ref([]);

    onMounted(async () => {

      Swal.fire({
        allowOutsideClick: false,
        text: 'Loading...'
      });
      
      Swal.showLoading();
      
      const resp = await getProducts();
      const body = await resp.json();
      products.value = body;
      Swal.close();
    
    });

    return {
      products
    }

  },
}
</script>

<style>


</style>

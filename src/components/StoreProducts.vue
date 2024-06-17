<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Auth } from '@/auth';

interface Product {
  id: number;
  title: string;
  price: string;
}

interface Pagination {
  current: number;
  per_page: number;
  pages: number;
  count: number;
  previous: number | null;
  next: number | null;
}

interface Store {
  id: number;
  name: string;
}

const route = useRoute();
const storeId = route.params.id;
const storeName = ref<string>('');
const products = ref<Product[]>([]);
const pagination = ref<Pagination | null>(null);
const auth = new Auth(true);

const fetchProducts = async (page: number | null = 1) => {
  if (!page) return;
  try {
    const token = auth.getToken();
    const response = await fetch(`http://localhost:3000/stores/${storeId}/products?page=${page}`, {
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': import.meta.env.VITE_X_API_KEY,
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      products.value = data.result.products;
      pagination.value = data.result.pagination || null;
      storeName.value = data.result.store.name;
    } else {
      console.error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div>
    <h1>{{ storeName }}'s products</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
    <div v-if="pagination">
      <button @click="fetchProducts(pagination.previous)" :disabled="!pagination.previous">Previous</button>
      <button @click="fetchProducts(pagination.next)" :disabled="!pagination.next">Next</button>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0.5rem 0;
}
</style>

<!-- src/components/StoreProducts.vue -->
<template>
  <div>
    <h1>Products for Store {{ storeId }}</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Auth } from '@/auth'

interface Product {
  id: number
  title: string
  price: number
}

const route = useRoute()
const storeId = route.params.id
const products = ref<Product[]>([])
const auth = new Auth(true)

onMounted(async () => {
  try {
    const token = auth.getToken()
    const response = await fetch(`http://localhost:3000/stores/${storeId}/products`, {
      headers: {
        Accept: 'application/json',
        'X-API-KEY': import.meta.env.VITE_X_API_KEY,
        Authorization: `Bearer ${token}`
      }
    })
    if (response.ok) {
      products.value = await response.json()
    } else {
      console.error('Failed to fetch products')
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0.5rem 0;
}
</style>

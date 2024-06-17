<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Auth } from '@/auth'

interface Store {
  id: number
  name: string
}

const auth = new Auth(true)
const stores = ref<Store[]>([])

onMounted(async () => {
  try {
    const token = auth.getToken()
    const response = await fetch('http://localhost:3000/stores', {
      headers: {
        Accept: 'application/json',
        'X-API-KEY': import.meta.env.VITE_X_API_KEY,
        Authorization: `Bearer ${token}`
      }
    })
    if (response.ok) {
      stores.value = await response.json()
    } else {
      console.error('Failed to fetch stores')
    }
  } catch (error) {
    console.error('Error fetching stores:', error)
  }
})
</script>

<template>
  <div>
    <h1>Stores</h1>
    <ul>
      <li v-for="store in stores" :key="store.id">
        <router-link :to="{ name: 'store-products', params: { id: store.id } }">
          {{ store.name }}
        </router-link>
      </li>
    </ul>
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

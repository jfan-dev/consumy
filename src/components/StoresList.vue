<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Store {
  id: number;
  name: string;
}

const stores = ref<Store[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/stores', {
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': import.meta.env.VITE_X_API_KEY,
        'Authorization': 'Bearer YOUR_JWT_TOKEN'
      }
    });
    if (response.ok) {
      stores.value = await response.json();
    } else {
      console.error('Failed to fetch stores');
    }
  } catch (error) {
    console.error('Error fetching stores:', error);
  }
});
</script>

<template>
  <div>
    <h1>Stores</h1>
    <ul>
      <li v-for="store in stores" :key="store.id">
        {{ store.name }}
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
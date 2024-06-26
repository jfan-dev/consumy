<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Auth } from '@/auth'

interface Store {
  id: number
  name: string
}

const auth = new Auth(true)
const isLoggedIn = ref(auth.isLoggedIn())
const stores = ref<Store[]>([])
const sortOrder = ref('asc')

const fetchStores = async () => {
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
}

const sortedStores = computed(() => {
  return [...stores.value].sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })
})

const signOut = function() {
  auth.signOut(() => {
    isLoggedIn.value = auth.isLoggedIn()
  })
}

onMounted(fetchStores)
</script>

<template>
  <header>
    <div class="flex container">

      <div class="logo">
        <img src="../assets/imgs/chefzilla-logo-nome.png" alt="Chefzilla Logo">
      </div>
      <nav>
                <ul>
                  <li><a href="/">Home</a></li>
                <li><a href="/stores">Restaurants</a></li>
                <li><a href="#">Promotion</a></li>
                <li><a href="#">Favorites</a></li>
              </ul>
            </nav>
            <div class="user-info">
              <button @click="signOut" class="btn-primary">Logout</button>
            </div>
          </div>
          </header>
          
          <main class="container">

            <section class="stores">
                <h2>Stores</h2>
                <label for="sort-order">Sort by:</label>
                <select id="sort-order" v-model="sortOrder">
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
                <ul class="new-list">
                  <li class="new-item" v-for="store in sortedStores" :key="store.id">
                    <router-link :to="{ name: 'store-products', params: { id: store.id } }">
                      <img src="../assets/pratos/sushi.png" alt="">
                            {{ store.name }}
                        </router-link>
                    </li>
                </ul>
            </section>

            <section class="categories">
              <h2>Categories</h2>
              <div class="new-list">
                  <div class="new-item">
                      <img src="../assets/pratos/burguer.png" alt="Lanches">
                      <p>Burguers</p>
                  </div>
                  <div class="new-item">
                      <img src="../assets/pratos/pizza.png" alt="Pizza">
                      <p>Pizza</p>
                  </div>
                  <div class="new-item">
                      <img src="../assets/pratos/sushi.png" alt="Japonesa">
                      <p>Sushi</p>
                  </div>
                  <div class="new-item">
                      <img src="../assets/pratos/feijoada.png" alt="Brasileira">
                      <p>Brazilian</p>
                  </div>
                  <div class="new-item">
                      <img src="../assets/pratos/bolo.png" alt="Doces & Bolos">
                      <p>Sweets and cakes</p>
                  </div>
                  <div class="new-item">
                      <img src="../assets/pratos/acai.png" alt="Açaí">
                      <p>Brazilian Açaí</p>
                  </div>
              </div>
            </section>
          
            <section class="new">
                <h2>New restaurants</h2>
                <div class="new-list">
                    <div class="new-item">
                        <p>KFC - Frango Frito</p>
                    </div>
                    <div class="new-item">
                        <p>American Cookies</p>
                    </div>
                    <div class="new-item">
                        <p>Giraffas</p>
                    </div>
                    <div class="new-item">
                        <p>Pizza Hut</p>
                    </div>
                    <div class="new-item">
                        <p>Subway</p>
                    </div>
                </div>
            </section>
          
            <section class="recommended-dishes">
                <h2>The best of the chef</h2>
                <div class="new-list">
                    <div class="new-item">
                        <img src="../assets/pratos/acai.png" alt="Açaí Suprasumo">
                        <p>Açaí Suprasumo</p>
                    </div>
                    <div class="new-item">
                        <img src="../assets/pratos/bolo.png" alt="Chocolatudo da Má">
                        <p>Chocolatudo of the Má</p>
                    </div>
                    <div class="new-item">
                        <img src="../assets/pratos/sushi.png" alt="Combo mix japan">
                        <p>Combo mix japan</p>
                    </div>
                    <div class="new-item">
                        <img src="../assets/pratos/burguer.png" alt="Suculencia King">
                        <p>Suculent King</p>
                    </div>
                </div>
            </section>
          
          </main>
          
          <footer>
            <p>© 2024 Chefzilla. Todos os direitos reservados.</p>
          </footer>
</template>

<style scoped>

header {
    background-color: var(--red);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  
  .logo img {
    height: 40px;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
    margin: 0;
  }
  
  nav ul li a {
    text-decoration: none;
    font-weight: bold;
    color: white;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

header {
    background-color: var(--red);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .logo img {
    height: 40px;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
    margin: 0;
  }
  
  nav ul li a {
    text-decoration: none;
    font-weight: bold;
    color: white;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  

  section {
    margin-bottom: 30px;
  }
  
  .categories, .promotions, .latest-restaurants, .new, .recommended-dishes {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-top: 0;
    color: #ff4b2b;
  }
  
  .new-list {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 10px 0;
  }

  .stores .new-item {
    min-width: 150px;
  }
  
  .new-item {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    flex: 1 1 calc(25% - 20px);
  }
  
  .new-item img {
    height: 150px;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  
  footer {
    text-align: center;
    padding: 20px;
    background-color: #fff;
    border-top: 1px solid #ddd;
  }
  
  footer p {
    margin: 0;
    color: #777;
  }
  
</style>

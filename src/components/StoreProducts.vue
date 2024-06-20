<template>
  <header>
            <div class="logo">
                <img src="../../../assets/chefzilla-logo-nome.png" alt="Chefzilla Logo">
            </div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="/restaurantes">Restaurants</a></li>
                    <li><a href="#">Promotion</a></li>
                    <li><a href="#">Favorites</a></li>
                </ul>
            </nav>
            <div class="user-info">
                <button class="btn-primary">Logout</button>
                <!-- <span>R. Dr. José Marcelino, 83</span> -->
                <!-- <span>R$ 0,00</span> -->
            </div>
          </header>
          
          <main class="container">

            <h1>{{ storeName }}</h1>
            <div class="menu">
                <div class="menu-item" v-for="product in products" :key="product.id">
                    <!-- <img src="assets/pratos/burguer.png" alt="Nome do Prato"> -->
                    <div class="item-details">
                        <h2>{{ product.title }}</h2>
                        <p>Descrição do prato delicioso e apetitoso.</p>
                        <p class="price">R$ {{ product.price }}</p>
                        <button @click="showQuantityModal(product)" class="add-to-cart">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
          </main>
          
          <footer>
            <p>© 2024 Chefzilla. Todos os direitos reservados.</p>
          </footer>

          <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Quantidade para <br>{{ selectedProduct?.title }}</h2>
        <div class="quantity-selector">
          <button @click="decreaseQuantity">-</button>
          <span>{{ quantity }}</span>
          <button @click="increaseQuantity">+</button>
        </div>
        <div class="modal-buttons">
          <button @click="addToCartAndStay">Comprar mais</button>
          <button @click="addToCartAndGo">Ir para o Carrinho</button>
        </div>
        <button class="close" @click="closeModal">X</button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cart from '@/cart';
import { Auth } from '@/auth';

interface Product {
  id: number;
  title: string;
  price: number;
}

const auth = new Auth(true);
const products = ref<Product[]>([]);
const storeName = ref('');
const router = useRouter();

const showModal = ref(false);
const selectedProduct = ref<Product | null>(null);
const quantity = ref(1);

const fetchProducts = async () => {
  const token = auth.getToken();
  const response = await fetch(`http://localhost:3000/stores/${router.currentRoute.value.params.id}/products`, {
    headers: {
      'Accept': 'application/json',
      'X-API-KEY': import.meta.env.VITE_X_API_KEY,
      'Authorization': `Bearer ${token}`
    }
  });
  if (response.ok) {
    const data = await response.json();
    products.value = data.result.products;
    storeName.value = data.result.store.name;
  } else {
    console.error('Failed to fetch products');
  }
};

const showQuantityModal = (product: Product) => {
  selectedProduct.value = product;
  quantity.value = 1;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedProduct.value = null;
};

const increaseQuantity = () => {
  quantity.value += 1;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};

const addToCartAndStay = () => {
  if (selectedProduct.value) {
    Cart.addItem(selectedProduct.value, quantity.value);
    closeModal();
  }
};

const addToCartAndGo = () => {
  if (selectedProduct.value) {
    Cart.addItem(selectedProduct.value, quantity.value);
    closeModal();
    router.push({ name: 'cart' });
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.menu {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.menu-item {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    width: calc(25% - 20px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    display: flex;
    flex-direction: column;
}

.menu-item img {
    width: 100%;
    height: auto;
}

.item-details {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
}

.item-details h2 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.item-details p {
    margin: 10px 0;
    color: #666;
}

.price {
    font-size: 16px;
    font-weight: bold;
    color: #D32F2F;
}

.add-to-cart {
    background-color: #D32F2F;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.add-to-cart:hover {
    background-color: #b71c1c;
}
  
  
  /*  */

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
  
  h1 {
    font-size: 24px;
    margin-bottom: 50px;
  }

  h1, h2 {
    margin-top: 0;
    color: #ff4b2b;
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

  /* MODAL STYLES */
  .modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  position: relative;
}

.quantity-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.quantity-selector button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 32px;
}

.quantity-selector span {
  margin: 0 10px;
  font-size: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.close {
  background-color: red;
  color: white;
  border: none;
  border-radius: 25%;
  padding: 3px 6px;
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 2px;
}
  
  /* RESET */

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .flex {
    display: flex;
  }
  
  .container {
    max-width: 1140px;
    padding: 20px;
    margin: auto;
  }
  
  :root {
    --red: #bb0404;
    --orange: #f6ac32;
    --azul: #3f8a9c;
  }
  
  button {
   padding: 10px 20px;
   border-radius: 10px;
   border: none;
   margin: 5px;
   text-transform: uppercase;
   font-weight: 700;
   cursor: pointer;
  }
  
  
  .btn-primary {
    background-color: white;
  }
  
  .btn-primary:hover {
    background-color: var(--orange);
  }
  
  .btn-secondary {
    background-color: var(--orange);
  }
  
  .btn-secondary:hover {
    background-color: var(--azul);
  }
  
  h1 {
    font-size: 40px;
}

h2 {
    border-bottom: 2px solid var(--orange);
    margin-bottom: 10px;
    padding-bottom: 5px;
  }
</style>

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

            <section class="cart">
                <h2>Your Cart for {{ storeName }}</h2>

                <ul v-if="cart.items.length > 0">
                  <li v-for="item in cart.items" :key="item.product.id" class="cart-items">
                      <div class="cart-item">
                          <img src="../assets/pratos/feijoada.png" alt="Prato 1">
                          <div class="cart-item-info">
                              <h3>{{ item.product.title }}</h3>
                              <p>Quantidade: {{ item.quantity }}</p>
                              <p>Preço: R$ {{ item.product.price }}</p>
                          </div>
                          <div class="cart-item-actions">
                            <button @click="updateQuantity(item.product.id, item.quantity - 1)">-</button>
                            <span>{{ item.quantity }}</span>
                              <button @click="updateQuantity(item.product.id, item.quantity + 1)">+</button>
                              <button @click="removeItem(item.product.id)">Remove</button>
                          </div>
                        </div>
                      </li>
                      <button @click="clearCart">Clear Cart</button>
                    </ul>
                <p v-else>Your cart is empty.</p>
              


                <div class="cart-summary" v-if="cart.items.length > 0">
                  <h3>Resumo do Pedido</h3>
                  <p>Total: {{ total }}</p>
                  <button class="btn-secondary" @click="continueBuying">Continue Buying</button>
                  <button class="btn-secondary" @click="checkout">Checkout</button>
                </div>
            </section>
          
            <!-- <section class="shipping">
                <h2>Informações de Frete</h2>
                <form>
                    <div class="form-group">
                        <label for="address">Endereço de Entrega</label>
                        <input type="text" id="address" name="address" placeholder="Rua, Número, Bairro, Cidade">
                    </div>
                    <div class="form-group">
                        <label for="postal-code">CEP</label>
                        <input type="text" id="postal-code" name="postal-code" placeholder="XXXXX-XXX">
                    </div>
                </form>
            </section> -->
          
            <!-- <section class="payment">
                <h2>Forma de Pagamento</h2>
                <form>
                    <div class="form-group">
                        <label for="payment-method">Selecione o Método de Pagamento</label>
                        <select id="payment-method" name="payment-method">
                            <option value="credit-card">Cartão de Crédito</option>
                            <option value="debit-card">Cartão de Débito</option>
                            <option value="pix">Pix</option>
                            <option value="cash">Dinheiro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="card-number">Número do Cartão</label>
                        <input type="text" id="card-number" name="card-number" placeholder="XXXX XXXX XXXX XXXX">
                    </div>
                    <div class="form-group">
                        <label for="card-expiry">Validade</label>
                        <input type="text" id="card-expiry" name="card-expiry" placeholder="MM/AA">
                    </div>
                    <div class="form-group">
                        <label for="card-cvc">CVC</label>
                        <input type="text" id="card-cvc" name="card-cvc" placeholder="XXX">
                    </div>
                    <div class="form-group">
                        <button type="submit">Finalizar Pedido</button>
                    </div>
                </form>
            </section> -->
          </main>
          
          
  <!-- <div>
    <h1>Your Cart for {{ storeName }}</h1>
    <ul v-if="cart.items.length > 0">
      <li v-for="item in cart.items" :key="item.product.id">
        {{ item.product.title }} - {{ item.quantity }} x {{ item.product.price }}
        <button @click="updateQuantity(item.product.id, item.quantity - 1)">-</button>
        <span>{{ item.quantity }}</span>
        <button @click="updateQuantity(item.product.id, item.quantity + 1)">+</button>
        <button @click="removeItem(item.product.id)">Remove</button>
      </li>
    </ul>
    <p v-else>Your cart is empty.</p>
    <div v-if="cart.items.length > 0">
      <p>Total: {{ total }}</p>
      <button @click="clearCart">Clear Cart</button>
      <button @click="checkout">Checkout</button>
    </div>
    <button @click="continueBuying">Continue Buying</button>
  </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Cart from '@/cart';
import { Auth } from '@/auth'

const cart = ref({ items: [] });
const router = useRouter();
const route = useRoute();
const storeId = route.params.storeId;
const storeName = route.params.storeName;
const auth = new Auth(true)

const fetchCart = () => {
  cart.value = Cart.getCart(storeId);
};

const updateQuantity = (productId: number, quantity: number) => {
  Cart.updateQuantity(storeId, productId, quantity);
  fetchCart();
};

const removeItem = (productId: number) => {
  Cart.removeItem(storeId, productId);
  fetchCart();
};

const clearCart = () => {
  Cart.clearCart(storeId);
  fetchCart();
};

const continueBuying = () => {
  router.push({ name: 'store-products', params: { id: storeId } });
};

const checkout = async () => {
  const token = auth.getToken();
  const items = cart.value.items.map(item => ({
    product_id: item.product.id,
    quantity: item.quantity
  }));

  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_X_API_KEY,
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ order: { store_id: storeId, order_items_attributes: items } })
  });

  if (response.ok) {
    alert('Order placed successfully!');
    clearCart();
  } else {
    alert('Failed to place order');
  }
};

const total = computed(() => {
  return cart.value.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2);
});

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>

header {
    background-color: var(--red);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  header .container {
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
  
  main {
    padding: 20px;
  }
  
  section {
    margin-bottom: 30px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-top: 0;
    color: #ff4b2b;
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .cart-item {
    min-width: 480px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .cart-item img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
  }

  .cart-item-info {
    margin-right: auto;
  }
  
  .cart-item-info h3 {
    margin: 0;
    font-size: 1.2em;
  }
  
  .cart-item-info p {
    margin: 5px 0;
  }
  
  .cart-item-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .cart-item-actions button {
    background-color: #ff4b2b;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .cart-item-actions input {
    width: 50px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
  }
  
  .cart-summary {
    text-align: right;
    margin-top: 20px;
  }
  
  .cart-summary p {
    margin: 5px 0;
    font-size: 1.2em;
  }
  
  .shipping, .payment {
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input, .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
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

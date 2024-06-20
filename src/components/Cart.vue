<template>
  <div>
    <h1>Your Cart</h1>
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
      <button @click="continueBuying">Continue Buying</button>
      <button @click="clearCart">Clear Cart</button>
    </div>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Cart from '@/cart';

const cart = ref({ items: [] });
const router = useRouter();

const fetchCart = () => {
  cart.value = Cart.getCart();
};

const updateQuantity = (productId: number, quantity: number) => {
  Cart.updateQuantity(productId, quantity);
  fetchCart();
};

const removeItem = (productId: number) => {
  Cart.removeItem(productId);
  fetchCart();
};

const clearCart = () => {
  Cart.clearCart();
  fetchCart();
};

const continueBuying = () => {
  const storeId = cart.value.items[0]?.product.store_id; // Assuming each product has a store_id
  if (storeId) {
    router.push({ name: 'store-products', params: { id: storeId } });
  } else {
    alert('No store associated with the cart items.');
  }
};

const checkout = () => {
  // Future implementation for checkout functionality
  alert('Checkout functionality will be implemented in the future.');
};

const total = computed(() => {
  return cart.value.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2);
});

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  margin: 5px;
}
</style>

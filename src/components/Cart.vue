<template>
  <div>
    <h1>Your Cart</h1>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.product.title }} - {{ item.quantity }} x {{ item.price }}
        <button @click="removeFromCart(item.product.id)">Remove</button>
      </li>
    </ul>
    <div>
      <h2>Total: {{ total }}</h2>
      <button @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Auth } from '@/auth';

interface Product {
  id: number;
  title: string;
  price: number;
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

interface Cart {
  order_items: OrderItem[];
}

const cartItems = ref<OrderItem[]>([]);
const total = ref<number>(0);
const auth = new Auth(true);

const fetchCart = async () => {
  try {
    const token = auth.getToken();
    const response = await fetch('http://localhost:3000/carts', {
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': import.meta.env.VITE_X_API_KEY,
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      cartItems.value = data.order_items;
      total.value = data.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    } else {
      console.error('Failed to fetch cart');
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

const removeFromCart = async (productId: number) => {
  try {
    const token = auth.getToken();
    const response = await fetch('http://localhost:3000/carts/remove_item', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': import.meta.env.VITE_X_API_KEY,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ product_id: productId })
    });
    if (response.ok) {
      fetchCart();
    } else {
      console.error('Failed to remove item from cart');
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

const checkout = async () => {
  try {
    const token = auth.getToken();
    const response = await fetch('http://localhost:3000/carts/checkout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': import.meta.env.VITE_X_API_KEY,
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      alert('Order placed successfully');
      fetchCart();
    } else {
      console.error('Failed to checkout');
    }
  } catch (error) {
    console.error('Error during checkout:', error);
  }
};

onMounted(fetchCart);
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0.5rem 0;
}
button {
  margin-left: 1rem;
}
</style>

// src/cart.ts
class Cart {
  private storageKey: string;

  constructor() {
    this.storageKey = 'cart';
  }

  getCart(storeId: number) {
    const cart = localStorage.getItem(this.storageKey);
    const cartData = cart ? JSON.parse(cart) : {};
    return cartData[storeId] || { items: [] };
  }

  saveCart(storeId: number, cart: any) {
    const allCarts = localStorage.getItem(this.storageKey);
    const cartData = allCarts ? JSON.parse(allCarts) : {};
    cartData[storeId] = cart;
    localStorage.setItem(this.storageKey, JSON.stringify(cartData));
  }

  addItem(storeId: number, product: any, quantity: number) {
    const cart = this.getCart(storeId);
    const existingItem = cart.items.find((item: any) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    this.saveCart(storeId, cart);
  }

  removeItem(storeId: number, productId: number) {
    const cart = this.getCart(storeId);
    cart.items = cart.items.filter((item: any) => item.product.id !== productId);
    this.saveCart(storeId, cart);
  }

  updateQuantity(storeId: number, productId: number, quantity: number) {
    const cart = this.getCart(storeId);
    const existingItem = cart.items.find((item: any) => item.product.id === productId);

    if (existingItem) {
      existingItem.quantity = quantity;
      if (existingItem.quantity <= 0) {
        this.removeItem(storeId, productId);
      } else {
        this.saveCart(storeId, cart);
      }
    }
  }

  clearCart(storeId: number) {
    const allCarts = localStorage.getItem(this.storageKey);
    const cartData = allCarts ? JSON.parse(allCarts) : {};
    delete cartData[storeId];
    localStorage.setItem(this.storageKey, JSON.stringify(cartData));
  }
}

export default new Cart();

class Cart {
  private storageKey: string;

  constructor() {
    this.storageKey = 'cart';
  }

  getCart() {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : { items: [] };
  }

  saveCart(cart: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  addItem(product: any, quantity: number) {
    const cart = this.getCart();
    const existingItem = cart.items.find((item: any) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    this.saveCart(cart);
  }

  removeItem(productId: number) {
    const cart = this.getCart();
    cart.items = cart.items.filter((item: any) => item.product.id !== productId);
    this.saveCart(cart);
  }

  updateQuantity(productId: number, quantity: number) {
    const cart = this.getCart();
    const existingItem = cart.items.find((item: any) => item.product.id === productId);

    if (existingItem) {
      existingItem.quantity = quantity;
      if (existingItem.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCart(cart);
      }
    }
  }

  clearCart() {
    this.saveCart({ items: [] });
  }
}

export default new Cart();
import { createStorage, type SimpleStorage } from './storage';
import router from './router'

class Auth {
  private storage: SimpleStorage;

  constructor(persistent = false) {
    this.storage = createStorage(persistent);
  }

  async signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
    const body = {
      login: {
        email: email,
        password: password,
      },
    };

    const response = await fetch("http://localhost:3000/sign_in", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": import.meta.env.VITE_X_API_KEY
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(onFailure);
    }
  }

  async signUp(email: string, password: string, password_confirmation: string, onSuccess: () => void, onFailure: () => void) {
    const body = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      },
    };

    const response = await fetch("http://localhost:3000/new", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": import.meta.env.VITE_X_API_KEY
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(onFailure);
    }
  }

  private success(response: Response, onSuccess: () => void) {
    response.json().then((json) => {
      this.storage.store('token', json.token);
      this.storage.store('email', json.email);
      onSuccess();
    });
  }

  private failure(onFailure: () => void) {
    onFailure();
  }

  getToken() {
    return this.getFallback('token');
  }
  
  isLoggedIn() {
    return Boolean(this.getFallback('token'));
  }

  currentUser() {
    if (!this.isLoggedIn()) {
      return null;
    }

    return {
      email: this.getFallback('email'),
    };
  }

  private getFallback(key: string): string | null {
    const transient = createStorage(false);
    const persistent = createStorage(true);

    return transient.get(key) || persistent.get(key);
  }

  signOut(andThen = () => {}) {
    const transient = createStorage(false);
    const persistent = createStorage(true);

    transient.remove('token');
    transient.remove('email');
    persistent.remove('token');
    persistent.remove('email');
    router.push({ name: 'welcome' });
    andThen();
  }

  async addToCart(productId: number, quantity: number, onSuccess: () => void, onFailure: () => void) {
    const body = {
      product_id: productId,
      quantity: quantity
    };

    const token = this.getToken();
    const response = await fetch("http://localhost:3000/carts/add_item", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": import.meta.env.VITE_X_API_KEY,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      onSuccess();
    } else {
      onFailure();
    }
  }
}

export { Auth };
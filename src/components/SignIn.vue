<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Auth } from '../auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const remember = ref(false);
const awaiting = ref(false);

function onSubmit() {
  awaiting.value = true;
  const auth = new Auth(remember.value);
  auth.signIn(email.value || '', password.value || '', () => {
    awaiting.value = false;
    router.push('/stores');
  }, () => {
    awaiting.value = false;
    console.log('Login failed!');
  });
}
</script>

<template>
  <div class="login-container flex">

    <div class="login-image">
        <img src="../assets/imgs/login-img2.png" alt="Godzilla eating">
        <div class="testimonial flex">
          <img src="https://www.receiteria.com.br/wp-content/uploads/suco-verde-de-abacaxi-01-730x480.jpg" alt="Dish" class="dish-image">
          <div class="testimonial-content">
              <div class="stars">★★★★★</div>
              <p>"O melhor suco de Kaiju que já provei, achei que seria cajú, mas foi muito melhor!"</p>
          </div>
      </div>
    </div>

    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="onSubmit">
          <label for="username">E-mail</label>
          <input v-model="email" id="email" type="email" required>

          <label for="password">Senha</label>
          <input v-model="password" type="password" id="password" name="password" required>

          <div class="remember">
            <input v-model="remember" type="checkbox"><br />
            <label>Lembrar minha senha </label>
          </div>

          <button type="submit" v-show="!awaiting">Entrar</button>
          <p class="signup">Não tem uma conta? <a href="/signup">Crie uma agora</a></p>
      </form>
    </div>

  </div>
</template>

<style>

.login-container {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-image, .login-form {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.89);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 500px;
}

.stars {
  color: #ffd700;
  font-size: 1.5em;
}

.testimonial-content p {
  font-size: 1em;
  color: #666;
  margin: 10px;
}

.dish-image {
  width: 80px !important;
  height: 100px !important;
  border-radius: 10px;
  margin: auto;
}

.login-form {
  height: 100vh;
  flex: 1;
  flex-direction: column;
  padding: 40px;
}

.login-form h2 {
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.login-form form {
  width: 100%;
  max-width: 350px;
}

.login-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: var(--red);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

.login-form button:hover {
  background-color: var(--orange);
}

.signup {
  margin-top: 20px;
  text-align: center;
}

.signup a {
  color: var(--red);
  text-decoration: none;
}

.signup a:hover {
  text-decoration: underline;
}

.remember {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 10px
}

.remember label {
  margin-bottom: 0;
}

.remember input[type='checkbox'] {
  width: 15px;
  margin-bottom: 1px;
  margin-right: 8px;
}

@media (max-width: 650px) {
  .login-image {
    display: none;
  }
}
</style>

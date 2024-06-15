<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Auth } from '../auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const password_confirmation = ref('')
const remember = ref(false);
const awaiting = ref(false);

function onSubmit() {
  awaiting.value = true;
  const auth = new Auth(remember.value);
  auth.signUp(email.value || '', password.value || '', password_confirmation.value || '', () => {
    awaiting.value = false;
    router.push('/');
  }, () => {
    awaiting.value = false;
    console.log('Sign Up failed!');
  });
}
</script>

<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="onSubmit">
    
      <label>E-Mail: </label>
      <input v-model="email" type="email"><br />
    
      <label>Senha: </label>
      <input v-model="password" type="password"><br />

      <label>Confirme a senha: </label>
      <input v-model="password_confirmation" type="password"><br />
    
      <label>Remember Me: </label>
      <input v-model="remember" type="checkbox"><br />

      <button type="submit" v-show="!awaiting">Sign Up</button>
    </form>
  </div>
</template>
<template>
  <div>
    <h1>Sign In</h1>
    <form @submit.prevent="onSubmit">
      <label>E-Mail: </label>
      <input v-model="email" type="email"><br />
      <label>Password: </label>
      <input v-model="password" type="password"><br />
      <button type="submit" v-show="!awaiting">Sign In</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const awaiting = ref(false);

function onSubmit() {
  awaiting.value = true;
  auth.signIn(email.value, password.value, () => {
    awaiting.value = false;
    router.push('/');
  });
}
</script>
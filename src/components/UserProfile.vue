<script setup lang="ts">
import { Auth } from '../auth'
import { ref } from 'vue'

const auth = new Auth()
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const signOut = function() {
  auth.signOut(() => {
    isLoggedIn.value = auth.isLoggedIn()
  })
}
</script>

<template>
  <main>
    <template v-if="isLoggedIn">
      <h3>Hi, {{ currentUser && currentUser.email }}</h3>
      <br />
      <nav>
        <a @click="signOut">Sign Out</a>
      </nav>
    </template>

    <template v-else>
      <h1>Welcome to Consumy</h1>
      <h3>Please log in to have access</h3>
      <br />
      <nav>
        <RouterLink :to="{name: 'signin'}">
          Sign In
        </RouterLink>

        <RouterLink :to="{name: 'signup'}">
          Sign Up
        </RouterLink>
      </nav>
    </template>
  </main>
</template>
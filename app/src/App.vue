<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'

</script>

<template>
  <TheNavbar tagline="1" />
  <RouterView />
  <TheFooter />
</template>


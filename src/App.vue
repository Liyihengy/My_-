<script setup lang="ts">
import headComponent from '@/components/head.vue'
</script>

<template>
  <div class="body text-xs h-100% flex flex-col items-center">
    <headComponent />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>

</style>

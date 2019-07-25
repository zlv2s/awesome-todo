<template>
  <q-card-section class="row items-center">
    <div class="text-h6">
      <slot></slot>
    </div>
    <q-space />
    <q-btn dense flat icon="close" round v-close-popup />
  </q-card-section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
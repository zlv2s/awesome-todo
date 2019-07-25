<template>
  <q-banner
    :class="bgcolor"
    class="text-white list-heder text-uppercase text-center"
    dense
    inline-actions
  >
    <span class="text-bold text-subtitle1">
      <slot></slot>
    </span>
  </q-banner>
</template>

<script>
export default {
  props: ['bgcolor']
}
</script>

<style lang="scss">
.list-heder {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
</style>
<template>
  <div class="row q-mb-sm">
    <q-input
      :rules="[val => !!val || 'Field is required']"
      :value="name"
      @input="$emit('update:name',$event)"
      autofocus
      class="col"
      clearable
      label="Task Name"
      outlined
    />
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>

<style lang="scss" scoped>
</style>
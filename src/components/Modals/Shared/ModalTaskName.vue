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
      v-select-all
    />
  </div>
</template>

<script>
import { selectAll } from 'src/directives/directive-select-all'
export default {
  props: ['name'],
  directives: {
    selectAll
  }
}
</script>

<style lang="scss" scoped>
</style>
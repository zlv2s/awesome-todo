<template>
  <div class="row q-mb-sm">
    <q-input
      :rules="['date']"
      :value="dueDate"
      @input="$emit('update:dueDate',$event)"
      label="Due date"
      mask="date"
      outlined
    >
      <template v-slot:append>
        <q-icon class="cursor-pointer" name="event">
          <q-popup-proxy ref="qDateProxy" transition-hide="scale" transition-show="scale">
            <q-date :value="dueDate" @input="$emit('update:dueDate',$event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['dueDate']
}
</script>

<style lang="scss" scoped>
</style>
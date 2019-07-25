<template>
  <q-banner class="bg-grey-3" dense>
    <template v-slot:avatar>
      <q-icon color="primary" name="check" />
    </template>
    You have no task to complete
    <template v-slot:action>
      <q-btn @click="$root.$emit('addTask')" color="primary" flat label="Add Task" />
    </template>
  </q-banner>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
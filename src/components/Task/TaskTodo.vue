<template>
  <q-list bordered separator v-if="Object.keys(tasksTodo).length">
    <task :id="key" :key="key" :task="task" v-for="(task, key) in tasksTodo">
      <span>{{ key }}</span>
    </task>
  </q-list>
</template>

<script>
export default {
  props: ['tasksTodo'],
  components: {
    task: require('./Task').default
  }
}
</script>
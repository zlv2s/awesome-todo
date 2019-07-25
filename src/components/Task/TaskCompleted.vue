<template>
  <q-list bordered separator v-if="Object.keys(tasksCompleted).length">
    <task :id="key" :key="key" :task="task" v-for="(task, key) in tasksCompleted">
      <span>{{ key }}</span>
    </task>
  </q-list>
</template>

<script>
export default {
  props: ['tasksCompleted'],
  components: {
    'task': require('./Task').default
  }
}
</script>

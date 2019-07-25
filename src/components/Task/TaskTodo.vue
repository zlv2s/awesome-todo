<template>
  <div>
    <list-header bgcolor="bg-warning">Todo</list-header>
    <q-list bordered separator>
      <task :id="key" :key="key" :task="task" v-for="(task, key) in tasksTodo"></task>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ['tasksTodo'],
  components: {
    task: require('./Task').default,
    'list-header': require('./Shared/ListHeader').default
  }
}
</script>
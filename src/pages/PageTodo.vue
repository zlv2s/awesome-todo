<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search />
      <sort />
    </div>
    <p
      class="text-center"
      v-if="search && !Object.keys(tasksTodo).length &&  !Object.keys(tasksCompleted).length"
    >No search results</p>

    <!-- * criteria for no-task show or not -->
    <no-task v-if="!Object.keys(tasksTodo).length && !search" />

    <task-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length" />

    <q-separator dark spaced />

    <task-completed :tasksCompleted="tasksCompleted" v-if="Object.keys(tasksCompleted).length" />

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn @click="openAddTask" color="primary" icon="add" round size="24px"></q-btn>
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @closeModal="closeAddTask" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapState('taskModule', ['search']),
    ...mapGetters('taskModule', ['tasksTodo', 'tasksCompleted'])
  },

  mounted() {
    this.$root.$on('addTask', () => {
      this.openAddTask()
    })
  },
  components: {
    'add-task': require('../components/Modals/AddTask').default,
    'task-todo': require('../components/Task/TaskTodo').default,
    'task-completed': require('../components/Task/TaskCompleted').default,
    'no-task': require('../components/Task/NoTask').default,
    search: require('../components/Task/Tools/Search').default,
    sort: require('../components/Task/Tools/Sort').default
  },
  methods: {
    closeAddTask() {
      this.showAddTask = false
    },
    openAddTask() {
      this.showAddTask = true
    }
  }
}
</script>

<style lang="scss">
.text-strikethrough {
  text-decoration: line-through;
}
</style>
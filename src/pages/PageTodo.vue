<template>
  <q-page class="q-pa-md">
    <!-- <q-list bordered separator v-if="Object.keys(tasksTodo).length">
      <task :id="key" :key="key" :task="task" v-for="(task, key) in tasksTodo">
        <span>{{ key }}</span>
      </task>
    </q-list>-->
    <task-todo :tasksTodo="tasksTodo" />
    <q-separator spaced dark />
    <task-completed :tasksCompleted="tasksCompleted" />

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn @click="showAddTask = true" color="primary" icon="add" round size="24px"></q-btn>
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @closeModal="closeAddTask" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('taskModule', ['tasksTodo', 'tasksCompleted'])
  },

  components: {
    'add-task': require('../components/Modals/AddTask').default,
    'task-todo': require('../components/Task/TaskTodo').default,
    'task-completed': require('../components/Task/TaskCompleted').default
  },
  methods: {
    closeAddTask() {
      this.showAddTask = false
    }
  }
}
</script>

<style lang="scss">
.text-strikethrough {
  text-decoration: line-through;
}
</style>
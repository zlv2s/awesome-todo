<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksLoaded">
        <div class="row q-mb-lg">
          <search />
          <sort />
        </div>
        <p
          class="text-center"
          v-if="search && !Object.keys(tasksTodo).length &&  !Object.keys(tasksCompleted).length "
        >No search results</p>

        <q-scroll-area class="q-scroll-area-tasks">
          <!-- * criteria for no-task show or not -->
          <no-task
            v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"
          />

          <task-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length" />

          <q-separator dark spaced />

          <task-completed
            :tasksCompleted="tasksCompleted"
            class="q-mb-xl"
            v-if="Object.keys(tasksCompleted).length"
          />
        </q-scroll-area>

        <div class="absolute-bottom no-pointer-events text-center q-mb-lg">
          <q-btn
            @click="openAddTask"
            class="all-pointer-events"
            color="primary"
            icon="add"
            round
            size="24px"
          />
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em" />
        </span>
      </template>
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
    ...mapState('taskModule', ['search', 'tasksLoaded']),
    ...mapGetters('taskModule', ['tasksTodo', 'tasksCompleted']),
    ...mapGetters('settingModule', ['settings'])
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
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div>
      <list-header bgcolor="bg-positive" v-if="!settings.showTasksInOneList">Copleted</list-header>
      <q-list bordered separator>
        <task :key="key" :task="task" :taskId="key" v-for="(task, key) in tasksCompleted"></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['tasksCompleted'],
  components: {
    task: require('./Task').default,
    'list-header': require('./Shared/ListHeader').default
  },
  computed: {
    ...mapGetters('settingModule', ['settings'])
  }
}
</script>

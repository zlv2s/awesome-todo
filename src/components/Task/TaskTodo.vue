<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header bgcolor="bg-warning" v-if="!settings.showTasksInOneList">Todo</list-header>
      <q-list bordered separator>
        <task :key="key" :task="task" :taskId="key" v-for="(task, key) in tasksTodo"></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['tasksTodo'],
  components: {
    task: require('./Task').default,
    'list-header': require('./Shared/ListHeader').default
  },
  computed: {
    ...mapGetters('settingModule', ['settings'])
  }
}
</script>
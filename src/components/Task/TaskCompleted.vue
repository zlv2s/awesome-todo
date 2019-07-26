<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated slideOutLeft"
  >
    <div>
      <list-header bgcolor="bg-positive" v-if="!settings.showTasksInOneList">Copleted</list-header>
      <q-list bordered separator>
        <task :id="key" :key="key" :task="task" v-for="(task, key) in tasksCompleted"></task>
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

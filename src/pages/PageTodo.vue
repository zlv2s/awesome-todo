<template>
  <q-page class="q-pa-md">
    <q-list bordered separator v-if="Object.keys(tasks).length">
      <task :id="key" :key="key" :task="task" v-for="(task, key) in tasks">
        <span>{{ key }}</span>
      </task>
    </q-list>

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
    ...mapGetters('taskModule', ['tasks'])
  },

  components: {
    'task': require('../components/Task/task').default,
    'add-task': require('../components/Modals/AddTask').default
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
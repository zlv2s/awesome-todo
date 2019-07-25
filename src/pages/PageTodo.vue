<template>
  <q-page class="q-pa-md">
    <q-list bordered separator>
      <!-- <q-item
        :class="bgColor(task)"
        :key="key"
        @click="task.completed = !task.completed"
        clickable
        v-for="(task, key) in tasks"
        v-ripple
      >
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="textStrikeThrough(task)">{{ task.name}} - {{key}}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <q-icon class="q-mr-xs" name="event" size="18px" />
            </div>
            <div class="column">
              <q-item-label caption class="row justify-end">{{ task.dueDate }}</q-item-label>
              <q-item-label caption class="row justify-end">
                <small>{{ task.dueTime }}</small>
              </q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>-->
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
      showAddTask: true
    }
  },
  computed: {
    ...mapGetters('taskModule', ['tasks'])
  },

  components: {
    task: require('../components/Task/task').default,
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
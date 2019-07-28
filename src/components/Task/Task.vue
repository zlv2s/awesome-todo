<template>
  <q-item
    :class="bgColor(task)"
    @click="updateTask({ taskId, updates:{ completed: !task.completed } })"
    clickable
    v-ripple
    v-touch-hold:600.mouse="handleHold"
  >
    <q-item-section side top>
      <!-- * replace v-model with value, add class -->
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="textStrikeThrough(task)"
        v-html="$options.filters.searchHighlight(
        task.name, search)"
      ></q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon class="q-mr-xs" name="event" size="18px" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{ task.dueDate | niceDate }}</q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{ taskDueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn @click.stop="showEditTask = true" color="primary" dense flat icon="edit" round />
        <q-btn @click.stop="promptToDelete(taskId)" color="red" dense flat icon="delete" round />
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <edit-task :task="task" :taskId="taskId" @closeModal="showEditTask = false" />
    </q-dialog>
  </q-item>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapActions, mapGetters } from 'vuex'
const { formatDate } = date
export default {
  data() {
    return {
      showEditTask: false
    }
  },
  props: {
    task: {
      type: Object,
      required: true
    },
    taskId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('taskModule', ['search']),
    ...mapGetters('settingModule', ['settings']),
    taskDueTime() {
      if (this.settings.show12) {
        return formatDate(`${this.task.dueDate} ${this.task.dueTime}`, 'h:mm a')
      } else {
        return this.task.dueTime
      }
    }
  },
  methods: {
    ...mapActions('taskModule', ['updateTask', 'deleteTask']),
    bgColor(task) {
      return task.completed ? 'bg-green-2' : 'bg-grey-1'
    },
    textStrikeThrough(task) {
      return task.completed ? 'text-strikethrough' : ''
    },
    promptToDelete(taskId) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Would you want to delete it?',
          ok: {
            push: false,
            unelevated: true
          },
          cancel: {
            push: false,
            unelevated: true,
            color: 'negative'
          },
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(taskId)
        })
    },
    handleHold() {
      this.showEditTask = true
    }
  },
  components: {
    'edit-task': require('../Modals/EditTask').default
  },
  filters: {
    niceDate(date) {
      return formatDate(date, 'MMM D')
    },
    searchHighlight(value, search) {
      if (search) {
        const searchRegExp = new RegExp(search, 'ig')
        return value.replace(
          searchRegExp,
          match => `<span class="bg-yellow-6">${match}</span>`
        )
      }
      return value
    }
  }
}
</script>
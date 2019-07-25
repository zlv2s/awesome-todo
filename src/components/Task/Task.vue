<template>
  <q-item
    :class="bgColor(task)"
    @click="updateTask({ id, updates:{ completed: !task.completed } })"
    clickable
    v-ripple
  >
    <q-item-section side top>
      <!-- * replace v-model with value, add class -->
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="textStrikeThrough(task)">
        {{ task.name}}
      </q-item-label>
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

    <q-item-section side>
      <div class="row">
        <q-btn @click.stop="showEditTask = true" color="primary" dense flat icon="edit" round />
        <q-btn @click.stop="promptToDelete(id)" color="red" dense flat icon="delete" round />
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <edit-task :id="id" :task="task" @closeModal="showEditTask = false" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'
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
    id: {
      type: String,
      required: true
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
    promptToDelete(id) {
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
          this.deleteTask(id)
        })
    }
  },
  components: {
    'edit-task': require('../Modals/EditTask').default
  }
}
</script>

<style lang="scss">
</style>
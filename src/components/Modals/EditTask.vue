<template>
  <q-card>
    <modal-header>Edit Task</modal-header>

    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <modal-task-name :name.sync="taskToSubmit.name" />

        <modal-due-date :dueDate.sync="taskToSubmit.dueDate" />

        <modal-due-time :dueTime.sync="taskToSubmit.dueTime" />
      </q-card-section>

      <q-card-actions align="right">
        <modal-button></modal-button>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import addEditTaskMixin from 'src/mixins/mixin-add-edit'

export default {
  mixins: [addEditTaskMixin],
  props: ['task', 'id'],
  data() {
    return {
      taskToSubmit: {}
    }
  },
  methods: {
    ...mapActions('taskModule', ['updateTask']),
    submitTask() {
      this.updateTask({ id: this.id, updates: this.taskToSubmit })
      this.$emit('closeModal')
    }
  },
  mounted() {
    // * deep copy
    this.taskToSubmit = Object.assign({}, this.task)
  }
}
</script>
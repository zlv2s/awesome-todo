<template>
  <q-card>
    <modal-header>Edit Task</modal-header>
    <q-form @submit.prevent="updateForm">
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
export default {
  props: ['task', 'id'],
  data() {
    return {
      taskToSubmit: {}
    }
  },
  methods: {
    ...mapActions('taskModule', ['updateTask']),
    updateForm() {
      this.updateTask({ id: this.id, updates: this.taskToSubmit })
      this.$emit('closeModal')
    }
  },
  components: {
    'modal-header': require('./Shared/ModalHeader').default,
    'modal-task-name': require('./Shared/ModalTaskName').default,
    'modal-due-date': require('./Shared/ModalDueDate').default,
    'modal-due-time': require('./Shared/ModalDueTime').default,
    'modal-button': require('./Shared/ModalButton').default
  },
  mounted() {
    // * deep copy
    this.taskToSubmit = Object.assign({}, this.task)
  }
}
</script>
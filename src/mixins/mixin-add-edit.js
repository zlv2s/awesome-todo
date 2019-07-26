export default {
  methods: {
    submitForm() {
      this.submitTask()
    }
  },
  components: {
    'modal-header': require('components/Modals/Shared/ModalHeader').default,
    'modal-task-name': require('components/Modals/Shared/ModalTaskName').default,
    'modal-due-date': require('components/Modals/Shared/ModalDueDate').default,
    'modal-due-time': require('components/Modals/Shared/ModalDueTime').default,
    'modal-button': require('components/Modals/Shared/ModalButton').default
  }

}
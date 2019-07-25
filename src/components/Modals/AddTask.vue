<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn dense flat icon="close" round v-close-popup />
    </q-card-section>

    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
            :rules="[val => !!val || 'Field is required']"
            autofocus
            class="col"
            clearable
            label="Task Name"
            outlined
            ref="name"
            v-model="taskToSubmit.name"
          />
        </div>

        <div class="row q-mb-sm">
          <q-input
            :rules="['date']"
            label="Due date"
            mask="date"
            outlined
            v-model="taskToSubmit.dueDate"
          >
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="event">
                <q-popup-proxy ref="qDateProxy" transition-hide="scale" transition-show="scale">
                  <q-date @input="() => $refs.qDateProxy.hide()" v-model="taskToSubmit.dueDate" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="row q-mb-sm" v-if="taskToSubmit.dueDate">
          <q-input label="Due time" outlined v-model="taskToSubmit.dueTime">
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="access_time">
                <q-popup-proxy transition-hide="scale" transition-show="scale">
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" flat label="Save" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  },
  methods: {
    ...mapActions('taskModule', ['addTask']),
    submitForm() {
      this.submitTask(0)
      this.$emit('closeModal')
    },
    submitTask() {
      this.addTask(this.taskToSubmit)
      console.log('submitted')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
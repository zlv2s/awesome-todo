<template>
  <q-item :class="bgColor(task)" @click="task.completed = !task.completed" clickable v-ripple>
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="textStrikeThrough(task)">{{ task.name}}</q-item-label>
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
  </q-item>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    bgColor(task) {
      return task.completed ? 'bg-green-2' : 'bg-grey-1'
    },
    textStrikeThrough(task) {
      return task.completed ? 'text-strikethrough' : ''
    }
  }
}
</script>

<style lang="scss">
</style>
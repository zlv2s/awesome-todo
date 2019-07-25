<template>
  <q-select
    :options="options"
    class="col q-ml-sm"
    emit-value
    filled
    label="sort by"
    stack-label
    v-model="sortBy"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      options: [
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Date',
          value: 'dueDate'
        }
      ]
    }
  },
  methods: {
    ...mapActions('taskModule', ['setSort'])
  },
  computed: {
    ...mapState('taskModule', ['sort']),
    sortBy: {
      get() {
        return this.sort
      },
      set(value) {
        this.setSort(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-select {
  flex: 0 0 112px;
}
</style>
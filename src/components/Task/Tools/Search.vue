<template>
  <q-input class="col" label="Search" outlined v-model="searchField">
    <template v-slot:append>
      <q-icon
        @click="searchField = ''"
        class="cursor-pointer"
        name="close"
        v-if="searchField !== ''"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions('taskModule', ['setSearch'])
  },
  computed: {
    ...mapState('taskModule', ['search']),
    searchField: {
      get() {
        return this.search
      },
      set(value) {
        this.setSearch(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
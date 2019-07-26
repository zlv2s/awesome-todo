<template>
  <q-page>
    <q-list bordered padding>
      <q-separator spaced />
      <q-item-label header>Setting</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="show12" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show task list in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="showTasksInOneList" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions('settingModule', ['setShow12', 'setShowTasksInOneList'])
  },
  computed: {
    ...mapGetters('settingModule', ['settings']),
    show12: {
      get() {
        return this.settings.show12
      },
      set(val) {
        this.setShow12(val)
      }
    },
    showTasksInOneList: {
      get() {
        return this.settings.showTasksInOneList
      },
      set(val) {
        this.setShowTasksInOneList(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
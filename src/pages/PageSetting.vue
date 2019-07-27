<template>
  <q-page>
    <q-list bordered class="q-mb-md" padding>
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

    <q-list bordered padding>
      <q-item-label header>More</q-item-label>

      <q-item tag="label" to="/setting/help" v-ripple>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item @click="visitOurWebsite" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visit our website</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item @click="emailUs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Email us</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions('settingModule', ['setShow12', 'setShowTasksInOneList']),
    visitOurWebsite() {
      openURL('https://github.com/zlv2s/awesome-todo')
    },
    emailUs() {
      window.location.href = 'mailto:zouli1911@gmail.com'
    }
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
<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('settingModule', ['getSettings']),
    ...mapActions('authModule', ['handleAuthStateChange'])
  },
  mounted() {
    this.getSettings()
    this.handleAuthStateChange()
  }
}
</script>

<style>
</style>

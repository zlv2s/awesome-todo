<template>
  <q-page padding>
    <q-card class="auth-tabs">
      <q-tabs
        active-color="primary"
        align="justify"
        class="text-grey"
        dense
        indicator-color="primary"
        narrow-indicator
        v-model="tab"
      >
        <q-tab label="Login" name="login" />
        <q-tab label="Register" name="register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels animated v-model="tab">
        <q-tab-panel name="login">
          <register-and-login :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <register-and-login :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageAuth',
  data() {
    return {
      tab: 'login'
    }
  },
  components: {
    'register-and-login': require('components/Auth/RegisterAndLogin').default
  }
}
</script>

<style lang="scss" scoped>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>
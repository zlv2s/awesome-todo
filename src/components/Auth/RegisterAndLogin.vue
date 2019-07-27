<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon color="primary" name="account_circle" />
        </template>
        {{ bannerInfo }}
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        :rules="[ val => isValidEmialAdd(val) || 'Please enter a valid email address' ]"
        class="col"
        label="Email"
        lazy-rules
        outlined
        ref="email"
        v-model="formData.email"
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        :rules="[ val => val.length >= 6 || 'Please use minimum 6 characters' ]"
        class="col"
        label="Password"
        lazy-rules
        outlined
        ref="password"
        type="password"
        v-model="formData.password"
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn :label="buttonVal" color="primary" type="submit" />
    </div>
  </form>
</template>

<script>
export default {
  name: 'RegAndLogin',
  props: ['tab'],
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    bannerInfo() {
      return this.tab === 'register'
        ? 'Register your account'
        : 'Please login your account'
    },
    buttonVal() {
      return this.tab === 'register' ? 'Register' : 'Login'
    }
  },
  methods: {
    submitForm() {
      if (this.$refs.email.validate() && this.$refs.password.validate()) {
        alert('validated')
      }
    },
    isValidEmialAdd(val) {
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(String(val).toLowerCase())
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
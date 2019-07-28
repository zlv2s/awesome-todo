<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">Awesome Todo</q-toolbar-title>
        <q-btn
          class="absolute-right"
          flat
          icon-right="account_circle"
          label="Login"
          to="/auth"
          v-if="!loggedIn"
        />
        <q-btn
          @click="logoutUser"
          class="absolute-right"
          flat
          icon-right="account_circle"
          label="Logout"
          v-else
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          :icon="nav.icon"
          :key="nav.label"
          :label="nav.label"
          :to="nav.to"
          v-for="nav in navs"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      :breakpoint="767"
      :width="250"
      bordered
      content-class="bg-primary"
      v-model="drawerLeft"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>
        <q-item
          :key="nav.label"
          :to="nav.to"
          class="text-grey-4"
          clickable
          exact
          v-for="nav in navs"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Layout',
  data() {
    return {
      drawerLeft: true,
      navs: [
        {
          label: 'Todo',
          icon: 'list',
          to: '/'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/setting'
        }
      ]
    }
  },
  computed: {
    ...mapState('authModule', ['loggedIn'])
  },
  methods: {
    ...mapActions('authModule', ['logoutUser'])
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
.q-drawer {
  .q-router-link--exact-active {
    color: #fff !important;
  }
}
</style>
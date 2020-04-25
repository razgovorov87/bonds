<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :mini-variant.sync="drawer"
      app
      color="rgb(6,8,24)"
      dark
      clipped
    >
      <v-list
      >

        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-bitcoin</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Облигации</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      color="rgb(6,8,24)"
      clipped-left
      dense
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon> 
      <v-toolbar-title class="font-weight-bold">BONDS</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        @click="resetZoom()"
        class="mr-2"
      >
        <v-icon
          class="mr-2"
        >
          mdi-magnify-minus-outline
        </v-icon>
        Сбросить zoom
      </v-btn>

      <v-btn
        @click="refreshPage()"
      >
        <v-icon
          class="mr-2"
        >
          mdi-refresh
        </v-icon>
        Обновить
      </v-btn>


      <v-menu
        offset-y
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="rgba(0, 0, 0, 0)"
            v-on="on"
          >
          <v-avatar
            v-if="avatar"
            size="36px"
            class="mr-2"
          >
            <img :src="avatar" alt="avatar">
          </v-avatar>
          <v-icon
            v-else
          >
            mdi-account-outline
          </v-icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        </template>

        <v-list dense
          color="rgb(25,30,58)"
          class="pa-2"
          dark
        >

          <!-- <v-list-item 
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Мой профиль</v-list-item-title>
          </v-list-item> -->

          <v-list-item 
            link
            to="/lockscreen"
          >
            <v-list-item-icon>
              <v-icon>mdi-lock-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Заблокировать</v-list-item-title>
          </v-list-item>

          <v-list-item 
            link
            @click="logout"
          >
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>

        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height d-flex align-start content__wrapper"
        fluid
      >
          <router-view ref="childComponent" />
      </v-container>
    </v-content>

  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}
.content__wrapper {
  background-color: #eff0f1;
}
</style>

<script>
import Home from '@/views/Home'
import BondsService from '../BondsService'
  export default {
    data: () => ({
      drawer: true
    }),
    created () {
      this.$vuetify.theme.dark = false
    },
    async mounted() {
      const uid = await this.$store.dispatch('getUid')
      if( !uid ) {
        this.$router.push('/login')
      }

      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout')
        this.$router.push('/login?message=logout')
      },
      refreshPage() {
        this.$refs.childComponent.refreshPage()
      },
      resetZoom() {
        this.$refs.childComponent.resetZoom()
      }
    },
    computed: {
      name() {
        return this.$store.getters.info.name
      },
      avatar() {
        return this.$store.getters.info.avatar
      }
    },
    components: {
      'child-component': Home
    }
  }
</script>
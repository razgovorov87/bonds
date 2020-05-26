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

        <v-list-group
          prepend-icon="mdi-account"
        >
          <template v-slot:activator>
            <v-list-item-title>Профиль</v-list-item-title>
          </template>

          <v-list 
            dense
            dark
          >

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
        </v-list-group>

        <v-list-item
          v-if="isAdmin"
          link
          to="/admin"
        >
          <v-list-item-icon>
                <v-icon>mdi-apps</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Админ-панель</v-list-item-title>
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
      <v-btn class="title font-weight-bold white--text" text href="/">Bonds</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        @click="resetZoom()"
        class="mr-2"
        :disabled="disableButton"
      >
        <v-icon
          class="mr-2"
        >
          mdi-magnify-minus-outline
        </v-icon>
        Сбросить zoom
      </v-btn>



      <v-btn
        v-if="timerDisplay"
        disabled
        class="mr-2"
      >
        <v-icon
          class="mr-2"
        >
          mdi-refresh
        </v-icon>
        00:{{currentTime}}
      </v-btn>

      <v-btn
        v-else
        @click="refreshPage()"
        class="mr-2"
        :disabled="disableButton"
      >
        <v-icon
          class="mr-2"
        >
          mdi-refresh
        </v-icon>
        Обновить
      </v-btn>

      <v-btn
        @click.stop="settingsDrawerShow()"
        :disabled="disableButton"
      >
        <v-icon class="mr-2">mdi-cog-outline</v-icon>
        Построения
      </v-btn>
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
      drawer: true,
      timerDisplay: false,      
      currentTime: 59,
      timer: null
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
      settingsDrawerShow() {
        this.$refs.childComponent.settingsDrawer = !this.$refs.childComponent.settingsDrawer
      },
      startButtonTimer() {
        this.currentTime = 59
        this.timer = setInterval(() => {
            this.currentTime--
            if(this.currentTime < 10) {
              this.currentTime = '0' + this.currentTime
            }
        }, 1000)
      },
      stopButtonTimer() {
        clearTimeout(this.timer)
      },
      async logout() {
        await this.$store.dispatch('logout')
        this.$router.push('/login?message=logout')
      },
      refreshPage() {
        this.timerDisplay = true
        this.$refs.childComponent.refreshPage()
        this.startButtonTimer()
        setTimeout(() => {
          this.stopButtonTimer()
          this.timerDisplay = false
        }, 60*1000);
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
      },
      isAdmin() {
        return this.$store.getters.info.isAdmin
      },
      disableButton() {
        if (this.$route.path == '/admin') {
          return true
        } else {
          return false
        }
      }
    },
    components: {
      'child-component': Home
    }
  }
</script>
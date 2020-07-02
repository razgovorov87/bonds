<template>
  <Loader v-if="loading" />
  <v-app  v-else id="inspire">
    <v-navigation-drawer
      :mini-variant.sync="drawer"
      app
      :color="theme === 'light' ? '#060818' : '#282c3d'"
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
      :color="theme === 'light' ? '#060818' : '#282c3d'"
      clipped-left
      dense
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center appbar__title">
        <v-btn class="title font-weight-bold white--text mr-3" text href="/">Bonds</v-btn>
        <v-switch v-model="dark" @change="changeTheme" inset append-icon="mdi-weather-night" prepend-icon="mdi-weather-sunny" color="white"></v-switch>
        <v-divider vertical class="mx-5"></v-divider>
        <v-switch inset v-model="typeChart" @change="editTypeChart" class="d-flex align-center">
          <template v-slot:prepend>
            <span>Сделки</span>
          </template>
          <template v-slot:append>
            <span>Котировки</span>
          </template>
        </v-switch>
        <v-divider vertical class="mx-5"></v-divider>
        <v-chip label :color="realTime ? 'success' : ''" class="real__time__chip">
          <v-switch v-model="realTime" color="white" @change="updateRealTime">
            <template v-slot:append>
              <v-icon class="white--text ml-2" id="realtime__icon">mdi-cached</v-icon>
            </template>
          </v-switch>
        </v-chip>
        <v-menu offset-y transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-chip v-on="on" :color="realTime ? 'success' : ''" label class="real__time__count">{{realTimeMinute}} мин <v-icon size="18" class="ml-1">mdi-menu-down</v-icon></v-chip>
          </template>
          <v-list dense>
            <v-list-item @click="realTimeCount(1)">1 мин</v-list-item>
            <v-list-item @click="realTimeCount(5)">5 мин</v-list-item>
            <v-list-item @click="realTimeCount(10)">10 мин</v-list-item>
            <v-list-item @click="realTimeCount(30)">30 мин</v-list-item>
            <v-list-item @click="realTimeCount(60)">60 мин</v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>

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
        class="mr-2 elevation-0"
        :color="theme === 'light' ? '#060818' : '#222533'"
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
        :color="theme === 'light' ? '#060818' : '#222533'"
        class="elevation-0"
        :disabled="disableButton"
      >
        <v-icon class="mr-2">mdi-cog-outline</v-icon>
        Построения
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height d-flex align-start content__wrapper"
        :class="[dark ? 'dark' : 'light']"
        fluid
      >
          <router-view ref="childComponent" />
      </v-container>
    </v-content>

  </v-app>
</template>

<style>
#realtime__icon.anim {
  animation: rotate 10s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(-360deg)
  }
}
html {
  overflow-y: auto;
}
.content__wrapper.light {
  background-color: #eff0f1;
}
.content__wrapper.dark {
  background-color: #444c67;
}
.appbar__title .v-input__slot {margin-bottom: 0;}
.appbar__title .v-input__control {
  justify-content: center;
  flex-direction: row;
  flex-wrap: inherit;
}
.real__time__chip {
  border-radius: 5px 0 0 5px !important;
  border-right: 1px solid #ababab !important;
}
.real__time__count {
  border-radius: 0 5px 5px 0 !important;
}
</style>

<script>
import Loader from '@/components/Loader'
import Home from '@/views/Home'
import BondsService from '../BondsService'
  export default {
    data: () => ({
      drawer: true,
      timerDisplay: false,      
      currentTime: 59,
      timer: null,
      dark: false,
      loading: true,
      realTime: false,
      realTimeMinute: 5,
      typeChart: false
    }),
    async created() {
      
      const uid = await this.$store.dispatch('getUid')
      if( !uid ) {
        this.$router.push('/login')
        return
      }


      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
      const info = this.$store.getters.info.defaultTheme
      if(info === 'dark') {
        this.dark = true
        this.$vuetify.theme.dark = true
      } else {
        this.dark = false
        this.$vuetify.theme.dark = false
      }
    

      this.loading = false
    },
    methods: {
      async changeTheme() {
        if(this.dark) {
          this.$vuetify.theme.dark = true
        } else {
          this.$vuetify.theme.dark = false
        }
        await this.$store.dispatch('userChangeTheme', this.dark)
      },
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
      updateRealTime() {
        if(this.realTime === true) {
          document.querySelector('#realtime__icon').classList.add('anim')
        } else {
          document.querySelector('#realtime__icon').classList.remove('anim')
        }
        this.$refs.childComponent.realTimeTrigger = this.realTime
      },
      realTimeCount(minute) {
        this.realTimeMinute = minute
        this.$refs.childComponent.realTimeCount = this.realTimeMinute
      },
      editTypeChart() {
        this.$refs.childComponent.typeChart = this.typeChart
      }
    },
    computed: {
      name() {
        return this.$store.getters.info.name
      },
      theme() {
        return this.$vuetify.theme.dark ? "dark" : "light";
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
      'child-component': Home,
      Loader
    }
  }
</script>
<template>
  <v-row>

    <v-navigation-drawer
      v-model="settingsDrawer"
      app
      temporary
      color="rgb(6,8,24)"
      width="350px"
      right
      >
      <Settings ref="settings" />
    </v-navigation-drawer>

    <v-col
      cols="12"
      style="padding-top: 0;"
    >
      <v-card
      >
        <v-skeleton-loader
        v-if="loading"
        type="image"
        ></v-skeleton-loader>
       <highcharts ref="chart" v-else  :options="chartOptions"></highcharts>       
      </v-card>


    <div class="table mt-5">
       <v-skeleton-loader
        v-if="loading"
        type="table"
        ></v-skeleton-loader>
      <v-card
       v-else
      >
        
          <v-expansion-panels
            flat
          >

            <v-expansion-panel
              style="border-bottom: 1px solid #d4d4d4;"
            >
              <v-expansion-panel-header>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    class="text-center"
                  >
                    <v-chip class="gray--text text-uppercase caption ma-0">Фильтры</v-chip>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card
                  elevation="0"
                >
                  
                  <v-row>

                    <v-col>

                        <v-form 
                          @submit.prevent="filterData()" 
                          style="min-width: 100%"
                        >
                          <v-row
                            align="center"
                            justify="space-between"
                          >

                            <v-row
                              justify="center"
                            >

                            <v-col
                              cols="4"
                            >
                              <v-text-field
                                v-model="filterName"
                                label="Название"
                                outlined
                              >
                                asdasd
                              </v-text-field>
                            </v-col>


                            <v-col
                              cols="4"
                            >
                              <v-text-field
                                v-model="filterIsin"
                                label="ISIN"
                                outlined
                                >
                                asdasd
                              </v-text-field>
                            </v-col>

                            </v-row>

                            <v-col
                              cols="12"
                            >
                              <v-select
                                v-model="typeValue"
                                :items="typeItems"
                                label="Тип"
                                multiple
                                outlined
                                small-chips
                                deletable-chips
                                class="mr-3 subtitle-2"
                                autowidth="false"
                              >

                                <template v-slot:prepend-item>
                                  <v-list-item
                                    ripple
                                    @click="toggle"
                                  >
                                    <v-list-item-action>
                                      <v-icon :color="typeValue.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                      <v-list-item-title>Выбрать все</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                  <v-divider class="mt-2"></v-divider>
                                </template>



                              </v-select>
                            </v-col>

                          </v-row>

                          <v-row
                            justify="end"
                          >

                          
                            <v-col
                              cols="3"
                            >
                              <v-btn
                                class="mr-2"
                                color="error"
                                @click="resetFilters()"
                              >
                                Сбросить фильтры
                              </v-btn>
                              <v-btn
                                color="primary"
                                type="submit"
                              >
                                Фильтр
                              </v-btn>

                            </v-col>


                          </v-row>

                        
                        </v-form>

                    </v-col>


                    <!-- <v-col>

                      <v-card
                        elevation="0"
                        class="d-flex justify-center flex-column"
                      >
                            <span v-if="!groups" class="mb-3 text-center">Вы не создавали ни одной группы</span>
                            <v-list v-else class="mb-3">
                              <v-list-item v-for="group in groups" :key="group.name">
                                <v-list-item-title>
                                  <v-list-item-avatar>
                                    <v-icon class="grey lighten-1 white--text">mdi-folder</v-icon>
                                  </v-list-item-avatar>
                                  <span class="font-weight-bold">{{group.name}}</span>
                                  </v-list-item-title>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="success"
                                  class="font-weight-bold mr-1"
                                  @click="showGroup(group)"
                                >
                                  Показать
                                </v-btn>
                                <v-btn
                                  color="red"
                                  @click="deleteGroup(group)"
                                >
                                  <v-icon
                                    color="white"
                                  >
                                    mdi-close
                                  </v-icon>
                                </v-btn>
                              </v-list-item>
                              <v-divider></v-divider>
                            </v-list>

                          <v-dialog v-model="dialogAddUserGroup" persistent max-width="600px">
                            <template v-slot:activator="{ on }">
                              <div class="d-flex justify-center">
                                <v-btn color="primary" dark v-on="on">Создать новую группу</v-btn>
                              </div>
                            </template>
                            <v-card>
                              <v-card-title>
                                <span class="headline">Создание группы</span>
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field 
                                      label="Название группы" 
                                      v-model="userGroupName" 
                                      required 
                                      :rules="userGroupNameRules"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialogAddUserGroup = false">Закрыть</v-btn>
                                <v-btn color="primary" @click="showSnackbar()">Создать</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>

                      </v-card>

                      <v-snackbar
                        v-model="userGroupSnackbar"
                        :timeout="snackbarTimeout"
                        bottom
                        right
                      >
                      Выбрано облигаций: {{countSelectBonds}}
                      <v-spacer></v-spacer>
                      <v-btn
                        color="info"
                        @click="addUserGroup()"
                      >
                        Добавить
                      </v-btn>
                      <v-btn
                        text
                        color="red"
                        class="font-weight-bold"
                        @click="userGroupSnackbar = false"
                      >
                        Отмена
                      </v-btn>
                      </v-snackbar>

                    </v-col> -->



                  </v-row>

                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items-per-page="15"
          :items="items"
          class="elevation-2"
          show-select
          item-key="isin"
          locale="ru-RU"
        >
        <template v-slot:item.name="{ item }">
          <v-btn
            color="primary"           
            @click="selectScatter(item)"
          >
            {{item.name}}
          </v-btn>
        </template>
        </v-data-table>
      </v-card>
    </div>
    </v-col>

    <v-snackbar
      v-model="baseLineSnackbar"
      :timeout="snackbarTimeout"
      bottom
      right
    >
    Выбрано облигаций: {{countSelectBonds}}
    <v-spacer></v-spacer>
    <v-btn
      color="info"
      @click="addBaseLine()"
    >
      Добавить
    </v-btn>
    <v-btn
      text
      color="red"
      class="font-weight-bold"
      @click="baseLineSnackbar = false"
    >
      Отмена
    </v-btn>
    </v-snackbar>

    <v-snackbar
        v-model="snackbar"
        :timeout="5000"
        :color="snackbarstatus"
        bottom
        right
    >
    <v-icon
        v-if="snackbarstatus == 'success'"
        class="mr-2"
        color="white"
    >
        mdi-check-circle-outline 
    </v-icon>
    <v-icon
        v-else
        class="mr-2"
        color="white"
    >
        mdi-alert-circle-outline 
    </v-icon>
    {{snackbarText}}
    <v-spacer></v-spacer>
    <v-btn
        text
        color="white"
        class="font-weight-bold"
        @click="snackbar = false"
    >
        Закрыть
    </v-btn>
    </v-snackbar>
  </v-row>    
</template>

<script>
import BondsService from '../BondsService'
import Settings from '@/components/Settings'
import {Chart} from 'highcharts-vue'
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import stockInit from "highcharts/modules/stock";

import {required} from 'vuelidate/lib/validators'


stockInit(Highcharts);
exportingInit(Highcharts);


export default {
  name: 'Home',
  data: () => ({
    settingsDrawer: false,
    dialogAddUserGroup: false,
    userGroupName: '',
    userGroupNameRules: [
      v => !!v || 'Введите название',
    ],
    baseLineSnackbar: false,
    baseLineName: '',
    snackbarTimeout: 0,
    snackbar: false,
    snackbarstatus: '',
    snackbarText: '',
    groups: [],
    bonds: [],
    filterIsin: '',
    filterName: '',
    typeItems: [
          'Биржевая облигация',
          'Государственная облигация',
          'Корпоративная облигация',
          'Муниципальная облигация',
          'Облигационный федеральный займ',
          'Облигация МФО',
          'Облигация центрального банка',
          'Региональная облигация',
        ],
        typeValue: [],
        selected: [],
        headers: [           
            {text: 'Название', value: 'name', align: 'center', sortable: false},
            {text: 'ISIN',  value: 'isin', sortable: false},
            {text: 'Доходность', value: 'profit'},
            {text: 'Дюрация', value: 'duration'},
            {text: 'Цена послед.', value: 'last_price'},
            {text: 'Лучший спрос', value: 'best_spros'},
            {text: 'Лучшее предл.', value: 'best_predl'},
            {text: 'Оборот', value: 'oborot'},
            {text: 'Тип', value: 'type'}
        ],
    loading: true,
    scatters: [],
    ofz: [],
    items: [],
    error: '',
    chart: [],
    selectPoint: [],
    chartOptions: {},
  }),
  validations: {
    userGroupName: {required}
  },
  async created() {
    try {
      this.typeValue = this.typeItems
      this.groups = await this.$store.dispatch('fetchUserGroup')
      this.bonds = await BondsService.getBonds()
      this.items = this.bonds
      this.getScatters()
      this.chartOptions = {
      chart: {
        height: 700,
        amimation: {
          duration: 500
        },
        type: 'scatter',
          panning: {
            enabled: true,
            type: 'xy'
          },
          panKey: 'shift',
          zoomType: 'xy',
          events: {
            load: (function(self) {
              return function() {
                self.chart = this;
              };
            })(this)
          }
        },
      title: {
        text: 'Облигации'
      },
      xAxis: {
        min: 0,
        minRange: 0.5,
        title: {
          text: 'Дюрация, лет'
        },
        minorTickInterval: 1,
        startOnTick: true,
        endOnTick: true
      },
      yAxis: {
        minRange: 1,
        title: {
          text: 'Доходность, %'
        },
      },
      legend: {
          enabled: false
      },
      plotOptions: {
        series: {
          turboThreshold: 2000,
          stickyTracking: false
        },
        scatter: {
          marker: {
            radius: 4,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)',
                fillColor: '#EF5350'
              },
            },
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
        },
      },
      navigator: {
        enabled: true,
        series: {
          type: 'scatter',
          lineWidth: 0,
          marker: {
            enabled: true,
            radius: 2
          }
        },
        xAxis: {
          labels: {
            enabled: false
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size: 10px">{point.point.id}</span><br><b>{point.point.name}</b><br>',
        pointFormat: 'Дюрация: {point.x} лет<br> Доходность: {point.y}%<br>Цена послед.: {point.last_price}<br>Лучший спрос: {point.best_spros}<br>Лучшее предл.: {point.best_predl}<br>Оборот: {point.oborot}<br>',
      },
      series: [
        {
        data: this.scatters
        }
      ]
    }

    this.loading = false

    } catch (e) {
      this.error = e.message
    }
  },
  methods: {
    toggle () {
        this.$nextTick(() => {
          if (this.likesAllItems) {
            this.typeValue = []
          } else {
            this.typeValue = this.typeItems.slice()
          }
        })
      },
    selectScatter(item) {
      this.selected = []
      if(this.selectPoint[0]) {
        this.selectPoint[0].setState('normal')
      }
      this.items = this.bonds
      const self = item
      const point = this.chart.series[0].data.filter(function(elem) {
        if (elem.id === self.isin) {
          return elem
        }
      })
      this.selectPoint = point
      this.selectPoint[0].setState('hover')
      window.scrollTo(0,70)
      point[0].setState('hover')
      const itemsArr = this.items.filter(function(elem) {

        if(elem.isin !== self.isin) {
          return elem
        }
      })
      itemsArr.unshift(self)
      this.selected.push(self)
      this.items = itemsArr
    },
    showSnackbar() {
      if(this.$v.$invalid) {
          this.$v.$touch()
          return
      }
      this.dialogAddUserGroup = false
      this.baseLineSnackbar = true
    },
    createBaseLine(item) {
      this.baseLineName = item
      this.settingsDrawer = false
      this.baseLineSnackbar = true
    },
    async addBaseLine() {
      if(!this.selected.length || this.selected.length == 1) {
        this.snackbar = true
        this.snackbarstatus = 'error'
        this.snackbarText = 'Неверное кол-во элементов'
        return
      }
      
      this.baseLineSnackbar = false
      const groupData = {
        name: this.baseLineName,
        bonds: this.selected
      }

      await this.$store.dispatch('createBaseLine', groupData)

      this.snackbar = true
      this.snackbarstatus = 'success'
      this.snackbarText = 'Базовая линия успешно создана'

      this.$refs.settings.fetchBaseLine()

      this.selected = []
      this.baseLineName = ''
    },
    async addUserGroup() {
      if(!this.selected.length) {
        this.snackbar = true
        this.snackbarstatus = 'error'
        this.snackbarText = 'В группу не добавлено ни одной облигации'
        return
      }
      this.userGroupSnackbar = false
      const groupData = {
        name: this.userGroupName,
        bonds: this.selected
      }
      await this.$store.dispatch('createUserGroup', groupData)

      this.snackbar = true
      this.snackbarstatus = 'success'
      this.snackbarText = 'Группа успешно создана'

      this.groups = await this.$store.dispatch('fetchUserGroup')
      this.selected = []
      this.userGroupName = ''

    },
    async deleteGroup(group) {
      await this.$store.dispatch('deleteUserGroup', group)
      this.groups = await this.$store.dispatch('fetchUserGroup')
      
      this.snackbar = true
      this.snackbarstatus = 'success'
      this.snackbarText = 'Группа успешно удалена'
    },
    async showGroup(group) {
      const groupItems = await this.$store.dispatch('fetchGroupData', group)
      this.items = groupItems.bonds
      this.getScatters()
    },
    resetZoom() {
      this.chart.zoomOut()
    },
    async refreshPage() {
      this.loading = true
      this.bonds = await BondsService.getBonds();
      this.filterData()
      this.loading = false
      // setTimeout(() => {
      //   this.chart.series[0].setData(this.scatters)
      //   this.chart.navigator.series[0].data = this.scatters
      // }, 0)
    },
    getScatters() {
      this.scatters = []
      this.items.map(bond => {
        this.scatters.push({
          id: bond.isin,
          name: bond.name,
          last_price: bond.last_price,
          best_spros: bond.best_spros,
          best_predl: bond.best_predl,
          oborot: bond.oborot,
          x: bond.duration,
          y: bond.profit
        })
      })
      setTimeout(() => {
        this.chart.series[0].setData(this.scatters)
      }, 0)
    },
    getLine(line) {
      const sortedData = []
      line.bonds.filter(bond => {
        sortedData.push({
          id: bond.isin,
          name: bond.name,
          last_price: bond.last_price,
          best_spros: bond.best_spros,
          best_predl: bond.best_predl,
          oborot: bond.oborot,
          x: bond.duration,
          y: bond.profit
        })
      })
      
      function byField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1
      }

      sortedData.sort(byField('x'))

      return sortedData

    },
    async filterData() {
      const typesName = this.typeValue
      const filtered = this.bonds.filter(function(bond) {
        switch(bond.type) {
          case typesName[0]:
             return bond;
          break;
          case typesName[1]:
             return bond;
          break;
          case typesName[2]:
             return bond;
          break;
          case typesName[3]:
             return bond;
          break;
          case typesName[4]:
             return bond;
          break;
          case typesName[5]:
             return bond;
          break;
          case typesName[6]:
             return bond;
          break;
          case typesName[7]:
             return bond;
          break;
        }
      })

      let finalArr = filtered

      if(this.filterIsin) {
        const isin = this.filterIsin.toUpperCase()
        finalArr = finalArr.filter(item => {
          return item.isin.indexOf(isin) > -1 
        })
        
      }

      if(this.filterName) {
        const name = this.filterName.toUpperCase()
        finalArr = finalArr.filter(item => {
          return item.name.indexOf(name) > -1
          
        })
      }
      this.items = finalArr

      this.getScatters()
      this.getOFZ()
      setTimeout(() => {
        this.chart.series[0].setData(this.scatters)
      }, 0)
    },
    resetFilters() {
      this.typeValue = this.typeItems
      this.items = this.bonds
    },
    chartsCreateLine(line) {
      const seriesData = this.getLine(line)
      const series = {
          name: line.name,
          color: '#FF8A80',
          lineWidth: 3,
          marker: {
            lineColor: '#FF8A80',
            radius: 6
          },
          stickyTracking: false,
          data: seriesData
        }
      this.chart.addSeries(series)

      this.snackbar = true
      this.snackbarstatus = 'success'
      this.snackbarText = 'Линия ' + line.name + ' построена'
    },
    chartsDeleteLine(line) {
      const seriesIndex = this.chart.series.findIndex(item => item.name == line.name)
      this.chart.series[seriesIndex].remove()

      this.snackbar = true
      this.snackbarstatus = 'success'
      this.snackbarText = 'Линия ' + line.name + ' удалена'
    }
  },
  computed: {
      likesAllItems () {
        return this.typeValue.length === this.typeItems.length
      },
      likesSomeItems () {
        return this.typeValue.length > 0 && !this.likesAllItems
      },
      icon () {
        if (this.likesAllItems) return 'mdi-close-box'
        if (this.likesSomeItems) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
      countSelectBonds() {
        return this.selected.length
      },
      groupsName() {
        return this.$store.getters.groups
      }
  },
  components: {
    highcharts: Chart,
    Settings
  }
}
</script>
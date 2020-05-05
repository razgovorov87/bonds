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

                    <v-col cols="12">

                        <v-form @submit.prevent="filterData()" style="min-width: 100%">

                          <v-row align="center" justify="space-between">

                            <v-row justify="center" style="width: 100%">

                              <v-col cols="2">
                                <v-text-field
                                  v-model="filterName"
                                  label="Название"
                                  outlined
                                >
                                  asdasd
                                </v-text-field>
                              </v-col>


                              <v-col cols="2">
                                <v-text-field
                                  v-model="filterIsin"
                                  label="ISIN"
                                  outlined
                                  >
                                  asdasd
                                </v-text-field>
                              </v-col>

                              <v-col cols="4" align="stretch">
                                <v-select
                                  v-model="typeValue"
                                  :items="typeItems"
                                  label="Тип"
                                  multiple
                                  outlined
                                  small-chips
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

                                  <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0 || index === 1">
                                      <span>{{ item }}</span>
                                    </v-chip>
                                    <span
                                      v-if="index === 2"
                                      class="grey--text caption"
                                    >(+{{ typeValue.length - 2 }} других)</span>
                                  </template>



                                </v-select>
                              </v-col>

                              <v-col cols="2">
                                <v-combobox
                                  v-model="emitentValue"
                                  :items="emitentItems"
                                  label="Эмитент"
                                  outlined
                                  class="mr-3 subtitle-2"
                                  autowidth="false"
                                >
                                </v-combobox>
                              </v-col>

                              <v-col cols="2">
                                <v-combobox
                                  v-model="sectorValue"
                                  :items="sectorItems"
                                  label="Сектор"
                                  outlined
                                  class="mr-3 subtitle-2"
                                  autowidth="false"
                                >
                                </v-combobox>
                              </v-col>
                              
                            </v-row>

                              <v-col cols="4">
                                <p class="text-center subtitle-2">Доходность, %</p>
                                <v-range-slider
                                  v-model="profitRange"
                                  :max="profitRangeMax"
                                  :min="profitRangeMin"
                                  hide-details
                                  class="align-center"
                                  >
                                    <template v-slot:prepend>
                                      <v-text-field
                                        :value="profitRange[0]"
                                        class="mt-0 pt-0"
                                        hide-details
                                        dense
                                        outlined
                                        type="number"
                                        style="width: 60px"
                                        @change="$set(profitRange, 0, $event)"
                                      ></v-text-field>
                                    </template>
                                    <template v-slot:append>
                                      <v-text-field
                                        :value="profitRange[1]"
                                        class="mt-0 pt-0"
                                        hide-details
                                        dense
                                        outlined
                                        type="number"
                                        style="width: 60px"
                                        @change="$set(profitRange, 1, $event)"
                                      ></v-text-field>
                                    </template>
                                  </v-range-slider>
                              </v-col>

                              <v-col cols="4">
                                <p class="text-center subtitle-2">Дюрация, лет</p>
                                <v-range-slider
                                  v-model="durationRange"
                                  :max="durationRangeMax"
                                  :min="durationRangeMin"
                                  hide-details
                                  class="align-center"
                                  >
                                    <template v-slot:prepend>
                                      <v-text-field
                                        :value="durationRange[0]"
                                        class="mt-0 pt-0"
                                        hide-details
                                        outlined
                                        dense
                                        step="0.01"
                                        ticks
                                        style="width: 60px"
                                        @change="$set(durationRange, 0, $event)"
                                      ></v-text-field>
                                    </template>
                                    <template v-slot:append>
                                      <v-text-field
                                        :value="durationRange[1]"
                                        class="mt-0 pt-0"
                                        hide-details
                                        outlined
                                        dense
                                        step="0.01"
                                        ticks
                                        style="width: 60px"
                                        @change="$set(durationRange, 1, $event)"
                                      ></v-text-field>
                                    </template>
                                  </v-range-slider>
                              </v-col>

                              <v-col cols="4">
                                <p class="text-center subtitle-2">Оборот, тыс.руб</p>
                                <v-range-slider
                                  v-model="oborotRange"
                                  :max="oborotRangeMax"
                                  :min="oborotRangeMin"
                                  hide-details
                                  class="align-center"
                                  >
                                    <template v-slot:prepend>
                                      <v-text-field
                                        :value="oborotRange[0]"
                                        suffix="тыс"
                                        class="mt-0 pt-0"
                                        hide-details
                                        outlined
                                        dense
                                        style="width: 105px"
                                        @change="$set(oborotRange, 0, $event)"
                                      ></v-text-field>
                                    </template>
                                    <template v-slot:append>
                                      <v-text-field
                                        :value="oborotRange[1]"
                                        suffix="тыс"
                                        class="mt-0 pt-0"
                                        hide-details
                                        outlined
                                        dense
                                        style="width: 105px"
                                        @change="$set(oborotRange, 1, $event)"
                                      ></v-text-field>
                                    </template>
                                  </v-range-slider>
                              </v-col>


                            <v-row justify="end">

                            
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

                          </v-row> 
                        </v-form>

                    </v-col>

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
    colors: [
      '#FF5252',
      '#E040FB',
      '#673AB7',
      '#3F51B5',
      '#009688',
      '#CDDC39',
      '#004D40',
      '#FF9800',
      '#795548',
      '#607D8B',
      '#000000',
      '#E91E63'
    ],
    settingsDrawer: false,
    dialogAddUserGroup: false,
    userGroupName: '',
    profitRange: [4, 7],
    profitRangeMin: -5,
    profitRangeMax: 20,
    durationRange: [0.01, 5.00],
    durationRangeMin: 0.00,
    durationRangeMax: 5.00,
    oborotRange: [0, 50],
    oborotRangeMin: 0,
    oborotRangeMax: 100,
    baseLineSnackbar: false,
    userGroupSnackbar: false,
    baseLineName: '',
    snackbarTimeout: 0,
    snackbar: false,
    snackbarstatus: '',
    snackbarText: '',
    bonds: [
      {id: 1, isin: '789456123', name: 'Asd123', profit: 0.2, duration: 0.5},
      {id: 2, isin: '123456', name: 'Asd123', profit: 0.3, duration: 0.3},
      {id: 3, isin: '123', name: 'Asd123', profit: 0.74, duration: 0.4},
      {id: 4, isin: '456', name: 'Asd123', profit: 0.35, duration: 0.54},
      {id: 5, isin: '789', name: 'Asd123', profit: 0.23, duration: 0.3},
      {id: 6, isin: '456123', name: 'Asd123', profit: 0.49, duration: 0.2},
      {id: 7, isin: '71432', name: 'Asd123', profit: 0.85, duration: 0.1},
    ],
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
    emitentItems: [],
    emitentValue: [],
    sectorValue: [],
    sectorItems: [],
    selected: [],
    headers: [           
        {text: 'Название', value: 'name', align: 'center', sortable: false, width: '190px'},
        {text: 'ISIN',  value: 'isin', sortable: false},
        {text: 'Доходность', value: 'profit'},
        {text: 'Дюрация', value: 'duration'},
        {text: 'Цена послед.', value: 'last_price'},
        {text: 'Лучший спрос', value: 'best_spros'},
        {text: 'Лучшее предл.', value: 'best_predl'},
        {text: 'Оборот', value: 'oborot'},
        {text: 'Тип', value: 'type', width: '243px'},
        {text: 'Эмитент', value: 'emitent.shortName', sortable: false, width: '240px'},
        {text: 'Сектор', value: 'emitent.sector', sortable: false, width: '240px'}
    ],
    loading: true,
    scatters: [],
    items: [],
    error: '',
    chart: [],
    selectPoint: [],
    chartOptions: {},
  }),
  async created() {
    try {
      this.typeValue = this.typeItems
      this.emitentValue = ''
      this.sectorValue = ''
      this.bonds = await BondsService.getBonds()
      setTimeout(() => {
        this.getMaxValue()
        this.getMinValue()
        this.oborotRange = [this.oborotRangeMin, this.oborotRangeMax]
      }, 0)
      this.items = this.bonds
      this.filterData()
      this.getEmitentItems()
      this.getSectorItems()
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
    createUserGroup(item) {
      this.userGroupName = item
      this.settingsDrawer = false
      this.userGroupSnackbar = true
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
      this.snackbarText = 'Базовая группа успешно создана'

      this.$refs.settings.fetchBaseLine()

      this.selected = []
      this.baseLineName = ''
    },
    async addUserGroup() {
      if(!this.selected.length || this.selected.length == 1) {
        this.snackbar = true
        this.snackbarstatus = 'error'
        this.snackbarText = 'Неверное кол-во элементов'
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

      this.$refs.settings.fetchUserGroup()

      this.selected = []
      this.baseLineName = ''
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
    getLine(item) {
      const sortedData = []
      item.bonds.filter(bond => {
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
          return item.isin.toUpperCase().indexOf(isin) > -1 
        })
        
      }

      if(this.filterName) {
        const name = this.filterName.toUpperCase()
        finalArr = finalArr.filter(item => {
          return item.name.toUpperCase().indexOf(name) > -1
          
        })
      }

      if(this.emitentValue) {
        const emitent = this.emitentValue
        finalArr = finalArr.filter(item => {
          if(item.emitent.shortName == emitent) {
            return item
          }
        })
      }

      if(this.sectorValue) {
        const sector = this.sectorValue
        finalArr = finalArr.filter(item => {
           if(item.emitent.sector == sector) {
            return item
          }
        })
      }

      finalArr = finalArr.filter(item => {
        if(this.profitRange[0] <= item.profit && this.profitRange[1] >= item.profit) {
          return item
        }
      })
      
      finalArr = finalArr.filter(item => {
        if(this.durationRange[0] <= item.duration && this.durationRange[1] >= item.duration) {
          return item
        }
      })

      finalArr = finalArr.filter(item => {
        if((this.oborotRange[0] * 1000) <= item.oborot && (this.oborotRange[1] * 1000) >= item.oborot) {
          return item
        }
      })

      this.items = finalArr

      this.getScatters()
    },
    resetFilters() {
      this.filterName = ''
      this.filterIsin = ''
      this.emitentValue = ''
      this.sectorValue = ''
      this.profitRange = [4,7]
      this.durationRange = [0,5]
      this.oborotRange = [this.oborotRangeMin, this.oborotRangeMax]
      this.typeValue = this.typeItems
      this.items = this.bonds
      this.filterData()
    },
    chartsCreateLine(line) {
      const colors = this.colors
      const seriesData = this.getLine(line)
      const seriesIndex = this.chart.series.findIndex(item => item.name == line.name)

      if(seriesIndex != -1) {
        this.snackbar = true
        this.snackbarstatus = 'error'
        this.snackbarText = 'Группа «' + line.name + '» уже отображена'
        return
      }

      const series = {
          name: line.name,
          color: this.colors[Math.floor(Math.random() * colors.length)],
          lineWidth: 3,
          marker: {
            lineColor: this.colors[Math.floor(Math.random() * colors.length)],
            radius: 6
          },
          stickyTracking: false,
          data: seriesData
        }
      this.chart.addSeries(series)
    },
    chartsDeleteLine(line) {
      const seriesIndex = this.chart.series.findIndex(item => item.name == line.name)
      this.chart.series[seriesIndex].remove()
    },
    async trashBaseLine(line) {

      await this.$store.dispatch('trashBaseLine', line)

      await this.$refs.settings.fetchBaseLine()

      this.snackbar = true
      this.snackbarstatus = 'success'
      this.snackbarText = 'Группа «' + line.name + '» успешно удалена'
    },
    async trashUserGroup(group) {

      await this.$store.dispatch('trashUserGroup', group)

      await this.$refs.settings.fetchUserGroup()

      this.snackbar = true
      this.snackbarstatus = 'success'
      this.snackbarText = 'Группа «' + group.name + '» успешно удалена'
    },
    getEmitentItems() {
      const tempArr = []
      this.items.map(items => {
        tempArr.push(
          items.emitent.shortName
        )
      })

      for(let str of tempArr){
        if( !this.emitentItems.includes(str) && str != null ){
          this.emitentItems.push(
            str
          )
        }
      }
    },
    getSectorItems() {
      const tempArr = []
      this.items.map(items => {
        tempArr.push(
          items.emitent.sector
        )
      })

      for(let str of tempArr){
        if( !this.sectorItems.includes(str) && str != null ){
          this.sectorItems.push(
            str
          )
        }
      }
    },
    getMaxValue() {
      let profitMax = 0
      let durationMax = 0
      let oborotMax = 0

      this.bonds.forEach(item => {
        if(item.profit > profitMax) {
          profitMax = item.profit
        }
        if(item.duration > durationMax) {
          durationMax = item.duration
        }
        if(item.oborot > oborotMax) {
          oborotMax = item.oborot
        }
      });
      
      this.profitRangeMax = Math.ceil(profitMax)
      this.durationRangeMax = Math.ceil(durationMax)
      this.oborotRangeMax = Math.ceil(oborotMax / 1000)
    },
    getMinValue() {
      let profitMin = 0
      let durationMin = 0
      let oborotMin = 0

      this.bonds.forEach(item => {
        if(item.profit < profitMin) {
          profitMin = item.profit
        }
        if(item.duration < durationMin) {
          durationMin = item.duration
        }
        if(item.oborot < oborotMin) {
          oborotMin = item.oborot
        }
      });
      
      this.profitRangeMin = Math.floor(profitMin)
      this.durationRangeMin = Math.floor(durationMin)
      this.oborotRangeMin = Math.floor(oborotMin / 1000)
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
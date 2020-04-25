<template>
  <v-row>

    <v-col
      cols="12"
    >
      <v-card
        color="rgba(0, 0, 0, 0)"
        elevation="0"
        class="mb-3 d-flex justify-end"
      >
      </v-card>
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
                  <span class="gray--text text-uppercase caption">Фильтры</span>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card-title>
                  <v-form @submit.prevent="filterData()">
                      <v-select
                      v-model="typeValue"
                      :items="typeItems"
                      label="Тип"
                      multiple
                      attach
                      chips
                      deletable-chips
                      class="mr-3"
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
                    <v-btn
                      color="primary"
                      type="submit"
                    >
                      Фильтр
                    </v-btn>
                  </v-form>
                </v-card-title>
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

  </v-row>    
</template>

<style>

</style>

<script>
import BondsService from '../BondsService'
import {Chart} from 'highcharts-vue'
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import stockInit from "highcharts/modules/stock";

stockInit(Highcharts);
exportingInit(Highcharts);


export default {
  name: 'Home',
  data: () => ({
    bonds: [],
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
    items: [],
    error: '',
    chart: [],
    chartOptions: {}
  }),
  async created() {
    this.typeValue = this.typeItems
    try {
      this.bonds = await BondsService.getBonds();
      this.items = this.bonds
      this.getScatters()
      this.chartOptions = {
      chart: {
        height: 750,
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
        minRange: 0.5,
        title: {
          text: 'Дюрация, лет'
        }
      },
      yAxis: {
        minRange: 1,
        title: {
          text: 'Доходность, %'
        }
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
                lineColor: 'rgb(100,100,100)'
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
        }
      },
      navigator: {
        enabled: true,
        series: {
          data: this.scatters,
          type: 'scatter',
          lineWidth: 0,
          marker: {
            enabled: true,
            radius: 4
          }
        }
      },
      tooltip: {
        enabled: true,
        headerFormat: '<span style="font-size: 10px">{point.point.id}</span><br><b>{point.point.name}</b><br>',
        pointFormat: 'Дюрация: {point.x} лет<br> Доходность: {point.y}%<br>Цена послед.: {point.last_price} ₽<br>Лучший спрос: {point.best_spros}<br>Лучшее предл.: {point.best_predl}<br>Оборот: {point.oborot}<br>',
      },
      series: [{
        data: this.scatters
      }]
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
      const self = item
      const point = this.chart.series[0].data.filter(function(elem) {
        if (elem.id === self.isin) {
          return elem
        }
      })
      window.scrollTo(0,0)
      this.chart.xAxis[0].setExtremes(item.duration - 0.1, item.duration + 0.1)
      this.chart.yAxis[0].setExtremes(item.profit - 1, item.profit + 1)
      
      point[0].setState('hover')
    },
    resetZoom(){
      this.chart.xAxis[0].setExtremes(0, 5)
      this.chart.yAxis[0].setExtremes(-5, 20)
    },
    async refreshPage() {
      this.loading = true
      await this.filterData()
      this.loading = false
      setTimeout(() => {
        this.chart.series[0].setData(this.scatters)
      }, 0)
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

    },
    async filterData() {
      this.bonds = await BondsService.getBonds();
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
      this.items = filtered
      this.getScatters()
      setTimeout(() => {
        this.chart.series[0].setData(this.scatters)
      }, 0)
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
  },
  components: {
    highcharts: Chart
  }
}
</script>
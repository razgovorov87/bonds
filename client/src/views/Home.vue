<template>
  <v-row>
    <Loader v-if="loadingOverlay" :text="loadingText" />

    <v-navigation-drawer
      v-model="settingsDrawer"
      app
      color="#060818"
      width="450px"
      right
      temporary
    >
      <Settings ref="settings" :key="refreshChart"/>
    </v-navigation-drawer>

    <v-col cols="12" style="padding-top: 0;">
      <v-card>
        <v-skeleton-loader v-if="chartLoading || loading" type="image"></v-skeleton-loader>
        <highcharts ref="chart" v-else :options="chartOptions" :key="refreshChart"></highcharts>
      </v-card>

      <v-card class="mt-3">
        <v-skeleton-loader v-if="chartLoading || loading" type="image"></v-skeleton-loader>
        <highcharts ref="gistogramma" v-else :options="gistoOptions"></highcharts>
      </v-card>

      <div class="table mt-5">
        <v-skeleton-loader v-if="loading" type="table"></v-skeleton-loader>
        <v-card v-else>
          <v-expansion-panels flat>
            <v-expansion-panel style="border-bottom: 1px solid #d4d4d4;">
              <v-expansion-panel-header>
                <v-row no-gutters>
                  <v-col cols="12" class="text-center">
                    <v-chip class="gray--text text-uppercase caption ma-0">Фильтры</v-chip>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card elevation="0">
                  <v-row>
                    <v-col cols="12">
                      <v-form @submit.prevent="filterData(bonds, 'user')" style="min-width: 100%">
                        <v-row align="center" justify="space-between">
                          <v-row justify="center" style="width: 100%">
                            <v-col cols="2">
                              <v-text-field v-model="filterName" label="Название" outlined></v-text-field>
                            </v-col>

                            <v-col cols="2">
                              <v-text-field v-model="filterIsin" label="ISIN" outlined></v-text-field>
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
                                  <v-list-item ripple @click="toggle">
                                    <v-list-item-action>
                                      <v-icon
                                        :color="typeValue.length > 0 ? 'indigo darken-4' : ''"
                                      >{{ icon }}</v-icon>
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
                                multiple
                                small-chips
                              >

                                <template v-slot:prepend-item>
                                  <v-list-item ripple @click="toggle1">
                                    <v-list-item-action>
                                      <v-icon
                                        :color="emitentValue.length > 0 ? 'indigo darken-4' : ''"
                                      >{{ icon }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                      <v-list-item-title>Выбрать все</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                  <v-divider class="mt-2"></v-divider>
                                </template>


                                <template v-slot:selection="{ item, index }">
                                  <v-chip v-if="index === 0">
                                    <span>{{ item }}</span>
                                  </v-chip>
                                  <span
                                    v-if="index === 1"
                                    class="grey--text caption"
                                  >(+{{ emitentValue.length - 1 }} других)</span>
                                </template>
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
                                multiple
                                small-chips
                              >

                                <template v-slot:prepend-item>
                                  <v-list-item ripple @click="toggle2">
                                    <v-list-item-action>
                                      <v-icon
                                        :color="sectorValue.length > 0 ? 'indigo darken-4' : ''"
                                      >{{ icon }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                      <v-list-item-title>Выбрать все</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                  <v-divider class="mt-2"></v-divider>
                                </template>

                                <template v-slot:selection="{ item, index }">
                                  <v-chip v-if="index === 0">
                                    <span>{{ item }}</span>
                                  </v-chip>
                                  <span
                                    v-if="index === 1"
                                    class="grey--text caption"
                                  >(+{{ sectorValue.length - 1 }} других)</span>
                                </template>
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
                                  style="width: 100px"
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
                                  style="width: 100px"
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
                              step="0.01"
                              class="align-center"
                            >
                              <template v-slot:prepend>
                                <v-text-field
                                  :value="parseFloat(durationRange[0])"
                                  class="mt-0 pt-0"
                                  hide-details
                                  outlined
                                  dense
                                  type="number"
                                  style="width: 80px"
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
                                  type="number"
                                  style="width: 80px"
                                  @change="$set(durationRange, 1, $event)"
                                ></v-text-field>
                              </template>
                            </v-range-slider>
                          </v-col>

                          <v-col cols="4">
                            <p class="text-center subtitle-2">Оборот, млн.руб</p>
                            <v-range-slider
                              v-model="oborotRange"
                              :max="oborotRangeMax"
                              :min="oborotRangeMin"
                              hide-details
                              step="0.1"
                              class="align-center"
                            >
                              <template v-slot:prepend>
                                <v-text-field
                                  :value="oborotRange[0]"
                                  suffix="млн"
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
                                  suffix="млн"
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
                            <v-col cols="5">
                              <div class="d-flex">
                                <v-checkbox v-model="zeroOborot" class="mr-5" color="primary" label="Убрать бумаги с 0 оборотом"></v-checkbox>
                                <v-checkbox v-model="BidAskZero" color="primary" label="Убрать бумаги с пустым стаканом"></v-checkbox>
                              </div>
                            </v-col>
                            <v-col cols="3">
                              <v-btn
                                class="mr-2"
                                color="error"
                                @click="resetFilters()"
                              >Сбросить фильтры</v-btn>
                              <v-btn color="primary" type="submit">Фильтр</v-btn>
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
            :key="refreshTable"
          >
            <template v-slot:item.name="{ item }">
              <v-btn color="primary" @click="selectScatter(item)">{{item.name}}</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-col>

    <v-snackbar v-model="baseLineSnackbar" :timeout="snackbarTimeout" bottom right>
      Выбрано облигаций: {{countSelectBonds}}
      <v-spacer></v-spacer>
      <v-btn color="info" @click="addBaseLine()">Добавить</v-btn>
      <v-btn text color="red" class="font-weight-bold" @click="baseLineSnackbar = false">Отмена</v-btn>
    </v-snackbar>

    <v-snackbar v-model="userGroupSnackbar" :timeout="snackbarTimeout" bottom right>
      Выбрано облигаций: {{countSelectBonds}}
      <v-spacer></v-spacer>
      <v-btn color="info" @click="addUserGroup()">Добавить</v-btn>
      <v-btn text color="red" class="font-weight-bold" @click="userGroupSnackbar = false">Отмена</v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar" :timeout="5000" :color="snackbarstatus" bottom center>
      <v-icon v-if="snackbarstatus == 'success'" class="mr-2" color="white">mdi-check-circle-outline</v-icon>
      <v-icon v-else class="mr-2" color="white">mdi-alert-circle-outline</v-icon>
      {{snackbarText}}
      <v-spacer></v-spacer>
      <v-btn text color="white" class="font-weight-bold" @click="snackbar = false">Закрыть</v-btn>
    </v-snackbar>

    <ItemDialog ref="ItemDialog" />
  </v-row>
</template>

<style>
.theme--dark.v-card, .theme--dark.v-application, .theme--dark.v-expansion-panels .v-expansion-panel, .theme--dark.v-data-table,
.theme--dark.v-list, .theme--dark.v-sheet.line__color {
  background-color: #282c3d !important;
}
.v-data-table__wrapper table tbody tr.highlight__green {
  animation: highlightGreen 2s ease;
}

.v-data-table__wrapper table tbody tr.highlight__red {
  animation: highlightRed 2s ease;
}


@keyframes highlightRed {
  from {
    background-color: #c22d2d;
  }
  to {
    background-color: #fff;
  }
}

@keyframes highlightGreen {
  from {
    background-color: #21a330;
  }
  to {
    background-color: #fff;
  }
}
.v-skeleton-loader__image {
  height: 700px !important;
}
</style>

<script>
import Loader from "@/components/Loader";
import BondsService from "../BondsService";
import Settings from "@/components/Settings";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";
import ItemDialog from "@/components/Home/ItemDialog";


import { required } from "vuelidate/lib/validators";

stockInit(Highcharts);

export default {
  name: "Home",
  data: () => ({
    colors: [
      '#FF0000',
      '#FF8C00',
      '#FFFF00',
      '#00FF00',
      '#00CED1',
      '#0000FF',
      '#FF00FF',
      '#000000',
      '#808080',
      '#B8860B'
    ],
    settingsDrawer: false,
    dialogAddUserGroup: false,
    userGroupName: "",
    profitRange: [4, 7],
    profitRangeMin: 0,
    profitRangeMax: 100,
    durationRange: [0.01, 5.0],
    durationRangeMin: 0.0,
    durationRangeMax: 5.0,
    oborotRange: [0, 50],
    oborotRangeMin: 0,
    oborotRangeMax: 100,
    baseLineSnackbar: false,
    userGroupSnackbar: false,
    baseLineName: "",
    snackbarTimeout: 0,
    snackbar: false,
    snackbarstatus: "",
    snackbarText: "",
    bonds: [
      {id: 1, name: 'Asdasdasd'},
      {id: 2, name: '123123123'},
      {id: 3, name: 'gdfmnkg[ndkfg'}
    ],
    bond: [],
    filterIsin: "",
    filterName: "",
    typeItems: [
      "Биржевая облигация",
      "Государственная облигация",
      "Корпоративная облигация",
      "Муниципальная облигация",
      "Облигационный федеральный займ",
      "Облигация МФО",
      "Облигация центрального банка",
      "Региональная облигация"
    ],
    typeValue: [],
    emitentItems: [],
    emitentValue: [],
    sectorValue: [],
    sectorItems: [],
    selected: [],
    headers: [
      {
        text: "Название",
        value: "name",
        align: "center",
        sortable: false,
        width: "190px"
      },
      { text: "ISIN", value: "isin", sortable: false },
      { text: "Доходность", value: "profit" },
      { text: "Дюрация", value: "duration" },
      { text: "BID", value: "bid" },
      { text: "ASK", value: "ask" },
      { text: "BID yield", value: "bid_yield" },
      { text: "ASK yield", value: "ask_yield" },
      { text: "Оборот", value: "oborot" },
      { text: "Тип", value: "type", width: "243px" },
      { text: "Эмитент", value: "emitent.shortname", width: "240px" },
      { text: "Сектор", value: "emitent.sector", width: "240px" }
    ],
    loading: true,
    loadingOverlay: true,
    scatters: [],
    series1: {
      name: 'Bid доходность',
      data: [],
      lineWidth: 0, 
      marker: {
        enabled: true,
        radius: 4
    }},
    series2: {
      name: 'Ask доходность',
      data: [], 
      lineWidth: 0, 
      marker: {
        enabled: true,
        radius: 4
    }},
    items: [],
    error: "",
    selectPoint: [],
    chartOptions: {},
    refreshChart: 0,
    realTimeTrigger: false,
    realTimeCount: 5,
    realTimeLoading: false,
    newArr: [],
    refreshTable: [],
    typeChart: false,
    chartLoading: false,
    zeroOborot: false,
    BidAskZero: false,
    drawPointName: false,
    gistoOptions: {}
  }),
  async created() {
    try {
      this.loadingText = "Обработка данных...";
      this.typeValue = this.typeItems;
      this.emitentValue = "";
      this.sectorValue = "";
      this.bonds = await BondsService.getBonds();
      setTimeout(() => {
        this.getMaxValue();
        this.getMinValue();
        this.oborotRange = [this.oborotRangeMin, this.oborotRangeMax];
      }, 0);
      this.items = this.bonds
      this.getEmitentItems();
      this.getSectorItems();
      this.emitentValue = this.emitentItems
      this.sectorValue = this.sectorItems
      const filterData = await this.$store.dispatch('fetchFilterData')
      if(filterData) {
        this.filterName = filterData.filterName;
        this.filterIsin = filterData.filterIsin;
        this.emitentValue = filterData.emitentValue;
        this.sectorValue = filterData.sectorValue;
        this.profitRange = filterData.profitRange;
        this.durationRange = filterData.durationRange;
        this.oborotRange = filterData.oborotRange;
        this.typeValue = filterData.typeValue;
      }
      this.filterData(this.bonds);
      const bg = this.theme === "dark" ? "#282c3d" : "#fff";
      const textcolor = this.theme === "dark" ? "#fff" : "#333";
      this.chartOptions = {
        chart: {
          height: 700,
          backgroundColor: bg,
          amimation: {
            duration: 500
          },
          type: "scatter",
          panning: {
            enabled: true,
            type: "xy"
          },
          panKey: "shift",
          zoomType: "xy",
          events: {
            load: (function(self) {
              return function() {
                self.chart = this;
              };
            })(this)
          }
        },
        title: {
          text: "Облигации"
        },
        xAxis: {
          min: 0,
          minRange: 0.5,
          title: {
            text: "Дюрация, лет",
            style: {color: textcolor}
          },
          minorTickInterval: 1,
          startOnTick: true,
          endOnTick: true,
          labels: {
            style: {color: textcolor}
          }
        },
        yAxis: {
          minRange: 1,
          title: {
            text: "Доходность, %",
            style: {color: textcolor}
          },
          labels: {
            style: {color: textcolor}
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
                  lineColor: "rgb(100,100,100)",
                  fillColor: "#EF5350"
                }
              }
            },
            states: {
              hover: {
                marker: {
                  enabled: false
                }
              }
            }
          }
        },
        navigator: {
          enabled: true,
          series: {
            type: "scatter",
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
          headerFormat:
            '<span style="font-size: 10px">{point.point.id}</span><br><b>{point.point.name}</b><br>',
          pointFormat:
            "Дюрация: {point.x} лет<br> Доходность: {point.y}%<br>Цена послед.: {point.last_price}<br>Лучший спрос: {point.best_spros}<br>Лучшее предл.: {point.best_predl}<br>Оборот: {point.oborot}<br>"
        },
        series: [
          {
            data: this.scatters,
          }
        ]
      };
      this.gistoOptions = {
          chart: {
              height: 300,
              type: 'column'
          },
          events: {
              load: (function(self) {
                  return function() {
                      self.chart = this;
                  };
              })(this)
          },
          title: {
              text: ""
          },
          yAxis: {
              type: 'logarithmic',
              title: {
                  text: "Оборот"
              },
          },
          legend: {
              enabled: false
          },
          series: [{name: 'Оборот', data: []}]
      }
      this.loading = false;
      this.loadingOverlay = false;
    } catch (e) {
      throw e
    }
  },
  watch: {
    drawPointName: function() {
      if(this.typeChart) {
        if(this.drawPointName) {
          const data = this.series2.data
          this.chartOptions.series[0] = {
            data: data,
            dataLabels: {
              enabled: true,
              format: "{point.name}"
            },
            name: 'Ask доходность',
            lineWidth: 0, 
            marker: {
              enabled: true,
              radius: 4
            }
          }
        } else {
          const data = this.series2.data
          this.chartOptions.series[0] = {
            data: data,
            name: 'Ask доходность',
            lineWidth: 0, 
            marker: {
              enabled: true,
              radius: 4
            }
          }
        }
        this.refreshChart++
      } else {
        if(this.drawPointName) {
          this.chartOptions.series[0] = {
            data: this.scatters,
            dataLabels: {
              enabled: true,
              format: "{point.name}"
            }
          }
        } else {
          this.chartOptions.series[0] = {
            data: this.scatters
          }
        }
        this.refreshChart++
      }
    },
    realTimeTrigger: async function() {
      
      if(this.realTimeTrigger) {
        const interval = setInterval( async () => {
          if(!this.realTimeTrigger) clearInterval(interval)

          const newArr = await BondsService.RealTime(this.items)
          console.log('Обновились: ', newArr)
          newArr.forEach(newBond => {
            const idx = this.items.findIndex(item => item.isin === newBond.isin)
            const colorClass = this.items[idx].oborot < newBond.oborot ? 'highlight__green' : 'highlight__red'
            this.items[idx] = newBond
            this.refreshTable++
            setTimeout( async () => {
              if(idx !== -1) {

                const tr = document.querySelectorAll('.v-data-table__wrapper table tbody tr')
                let bond
                tr.forEach(item => {
                  const td = item.querySelectorAll('td')
                  if(td[2].innerText === newBond.isin) {
                    bond = item
                    bond.classList.add(colorClass)
                  }
                })
                
                setTimeout( async () => {
                  if(bond) {
                    bond.classList.remove(colorClass)
                  }
                }, 2500)
              }
            }, 0) 
          })
        }, this.realTimeCount * 10000)
      } else {
        return
      }
    },
    theme: function() {
      const bg = this.theme === "dark" ? "#282c3d" : "#fff";
      this.chartOptions.chart.backgroundColor = bg;
      this.chartOptions.title.style = {color: this.theme === "dark" ? "#fff" : "#333"};
      this.chartOptions.xAxis.labels.style = {color: this.theme === 'dark' ? '#fff' : '#333'}
      this.chartOptions.yAxis.labels.style = {color: this.theme === 'dark' ? '#fff' : '#333'}
      this.chartOptions.xAxis.title.style = {color: this.theme === 'dark' ? '#fff' : '#333'}
      this.chartOptions.yAxis.title.style = {color: this.theme === 'dark' ? '#fff' : '#333'}
      this.refreshChart++;
    },
    typeChart: function() {
      this.chartLoading = true
      this.drawPointName = false
      this.$parent.$parent.$parent.drawPointName = false
      this.getScatters()
      this.refreshChart++
      setTimeout( () => {
        this.chartLoading = false
      }, 1000)
    }
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllItems) {
          this.typeValue = [];
        } else {
          this.typeValue = this.typeItems.slice();
        }
      });
    },
    toggle1() {
      this.$nextTick(() => {
        if (this.likesAllItems1) {
          this.emitentValue = [];
        } else {
          this.emitentValue = this.emitentItems.slice();
        }
      });
    },
    toggle2() {
      this.$nextTick(() => {
        if (this.likesAllItems2) {
          this.sectorValue = [];
        } else {
          this.sectorValue = this.sectorItems.slice();
        }
      });
    },
    selectScatter(item) {
      this.showItemDialog(item);
      const idx = this.chart.series[0].data.findIndex(
        elem => elem.id === item.isin
      );
      this.selectPoint.push(this.chart.series[0].data[idx]);
      this.selectPoint.forEach(item => item.setState("hover"));
      const itemsArr = this.items.filter(elem => {
        if (elem.isin !== item.isin) {
          return elem;
        }
      });
      itemsArr.unshift(item);
      this.selected.push(item);
      this.items = itemsArr;
    },
    showItemDialog(item) {
      const left = Math.floor(1135 * Math.random());
      const top = Math.floor(440 * Math.random());
      const check = this.$refs.ItemDialog.dialogs.findIndex(
        dialog => dialog.id === item.isin
      );
      if (check !== -1) {
        this.snackbar = true;
        this.snackbarstatus = "error";
        this.snackbarText = `${item.name} уже открыт!`;
        return;
      }
      this.$refs.ItemDialog.dialogs.push({
        id: item.isin,
        bond: item,
        options: { buttonPin: false, buttonClose: false, left, top }
      });
    },
    showSnackbar() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.dialogAddUserGroup = false;
      this.baseLineSnackbar = true;
    },
    createBaseLine(item) {
      this.baseLineName = item;
      this.settingsDrawer = false;
      this.baseLineSnackbar = true;
    },
    createUserGroup(item) {
      this.userGroupName = item;
      this.settingsDrawer = false;
      this.userGroupSnackbar = true;
    },
    async addBaseLine() {
      if (!this.selected.length || this.selected.length == 1) {
        this.snackbar = true;
        this.snackbarstatus = "error";
        this.snackbarText = "Неверное кол-во элементов";
        return;
      }
      const selectedItems = this.selected.map(item => item.isin);

      this.baseLineSnackbar = false;
      const groupData = {
        name: this.baseLineName,
        bonds: selectedItems,
        color: this.colors[Math.floor(12 * Math.random())]
      };
      await this.$store.dispatch("createBaseLine", groupData);

      this.snackbar = true;
      this.snackbarstatus = "success";
      this.snackbarText = "Базовая группа успешно создана";

      this.$refs.settings.fetchBaseLine();

      this.selected = [];
      this.baseLineName = "";
    },
    async addUserGroup() {
      if (!this.selected.length || this.selected.length == 1) {
        this.snackbar = true;
        this.snackbarstatus = "error";
        this.snackbarText = "Неверное кол-во элементов";
        return;
      }

      const selectedItems = this.selected.map(item => item.isin);

      this.userGroupSnackbar = false;
      const groupData = {
        name: this.userGroupName,
        bonds: selectedItems,
        color: this.colors[Math.floor(12 * Math.random())]
      };

      await this.$store.dispatch("createUserGroup", groupData);

      this.snackbar = true;
      this.snackbarstatus = "success";
      this.snackbarText = "Группа успешно создана";

      this.$refs.settings.fetchUserGroup();

      this.selected = [];
      this.baseLineName = "";
    },
    async deleteGroup(group) {
      await this.$store.dispatch("deleteUserGroup", group);
      this.groups = await this.$store.dispatch("fetchUserGroup");

      this.snackbar = true;
      this.snackbarstatus = "success";
      this.snackbarText = "Группа успешно удалена";
    },
    async showGroup(group) {
      const groupItems = await this.$store.dispatch("fetchGroupData", group);
      this.items = groupItems.bonds;
      this.getScatters();
    },
    resetZoom() {
      this.chart.zoomOut();
    },
    async refreshPage() {
      this.loading = true;
      this.loadingOverlay = true;
      this.loadingText = "Обновляем данные...";
      this.bonds = await BondsService.getBonds();
      this.filterData(this.bonds);
      this.loading = false;
      this.loadingOverlay = false;
      // setTimeout(() => {
      //   this.chart.series[0].setData(this.scatters)
      //   this.chart.navigator.series[0].data = this.scatters
      // }, 0)
    },
    getScatters() {
      this.scatters = [];
      this.series1.data = [];
      this.series2.data = [];
      const bg = this.theme === "dark" ? "#282c3d" : "#fff";
      const textcolor = this.theme === "dark" ? "#fff" : "#333";
      if(this.typeChart === false) {
         this.items.map(bond => {
          this.scatters.push({
            id: bond.isin,
            name: bond.name,
            last_price: bond.last_price,
            bid: bond.bid,
            ask: bond.ask,
            oborot: bond.oborot,
            x: bond.duration,
            y: bond.profit
          })
        })
      } else {
      this.items.map(bond => {
        this.series1.data.push({
          id: bond.isin,
          name: bond.name,
          last_price: bond.last_price,
          bid: bond.bid,
          ask: bond.ask,
          oborot: bond.oborot,
          x: bond.duration,
          y: bond.bid_yield
        });
        this.series2.data.push({
          id: bond.isin,
          name: bond.name,
          last_price: bond.last_price,
          best_spros: bond.best_spros,
          best_predl: bond.best_predl,
          oborot: bond.oborot,
          x: bond.duration,
          y: bond.ask_yield
        })
      });
      }
      this.scatters.sort((a, b) => a.x - b.x);
      this.series1.data.sort((a, b) => a.x - b.x);
      this.series2.data.sort((a, b) => a.x - b.x);
      setTimeout(() => {
        if( this.typeChart === false) {
          this.chartOptions = {
            chart: {
              height: 700,
              backgroundColor: bg,
              amimation: {
                duration: 500
              },
              type: "scatter",
              panning: {
                enabled: true,
                type: "xy"
              },
              panKey: "shift",
              zoomType: "xy",
              events: {
                load: (function(self) {
                  return function() {
                    self.chart = this;
                  };
                })(this)
              }
            },
            title: {
              text: "Облигации"
            },
            xAxis: {
              min: 0,
              minRange: 0.5,
              title: {
                text: "Дюрация, лет",
                style: {color: textcolor}
              },
              minorTickInterval: 1,
              startOnTick: true,
              endOnTick: true,
              labels: {
                style: {color: textcolor}
              }
            },
            yAxis: {
              minRange: 1,
              title: {
                text: "Доходность, %",
                style: {color: textcolor}
              },
              labels: {
                style: {color: textcolor}
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
                      lineColor: "rgb(100,100,100)",
                      fillColor: "#EF5350"
                    }
                  }
                },
                states: {
                  hover: {
                    marker: {
                      enabled: false
                    }
                  }
                }
              }
            },
            navigator: {
              enabled: true,
              series: {
                type: "scatter",
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
              headerFormat:
                '<span style="font-size: 10px">{point.point.id}</span><br><b>{point.point.name}</b><br>',
              pointFormat:
                "Дюрация: {point.x} лет<br> Доходность: {point.y}%<br>Цена послед.: {point.last_price}<br>BID: {point.bid}<br>ASK: {point.ask}<br>Оборот: {point.oborot}<br>"
            },
            series: [
              {
                data: this.scatters
              }
            ]
          };
          this.chart.options.chart.type = 'scatter'

          const gistoArr = []

          this.items.forEach( point => {
            gistoArr.push({
              ask: point.ask,
              bid: point.bid,
              x: point.duration,
              y: point.oborot
            })
          })

          
          
          this.$children[2].$children[0].chart.series[0].setData(gistoArr)
          this.chart.series[0].setData(this.scatters);
        } else {
          this.chartOptions = {
            chart: {
              height: 700,
              backgroundColor: bg,
              amimation: {
                duration: 500
              },
              type: "line",
              panning: {
                enabled: true,
                type: "xy"
              },
              panKey: "shift",
              zoomType: "xy",
              events: {
                load: (function(self) {
                  return function() {
                    self.chart = this;
                  };
                })(this)
              }
            },
            title: {
              text: "Облигации"
            },
            xAxis: {
              min: 0,
              minRange: 0.5,
              title: {
                text: "Дюрация, лет",
                style: {color: textcolor}
              },
              minorTickInterval: 1,
              startOnTick: true,
              endOnTick: true,
              labels: {
                style: {color: textcolor}
              }
            },
            yAxis: {
              minRange: 1,
              title: {
                text: "Доходность, %",
                style: {color: textcolor}
              },
              labels: {
                style: {color: textcolor}
              }
            },
            legend: {
              enabled: false
            },
            tooltip: {
              shared: true,
              distance: 30,
              crosshair: true,
              pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>'
            },
            plotOptions: {
              series: {
                turboThreshold: 2000,
                stickyTracking: false,
                lineWidth: 0,
                states: {
                  hover: {
                    enabled: true,
                    lineWidth: 0,
                    lineWidthPlus: 0
                  }
                }
              },
              line: {
                marker: {
                  radius: 4,
                  states: {
                    hover: {
                      enabled: true,
                      lineColor: "rgb(100,100,100)",
                      fillColor: "#EF5350"
                    }
                  }
                }
              }
            },
            navigator: {
              enabled: true,
              series: {
                type: "scatter",
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
            series: [this.series2, this.series1]
          };

          const gistoArr = []

          this.items.forEach( point => {
            gistoArr.push({
              ask: point.ask,
              bid: point.bid,
              x: point.duration,
              y: point.oborot
            })
          })

          this.$children[2].$children[0].chart.series[0].setData(gistoArr)

          this.chart.series[0].setData(this.series1.data);
          this.chart.series[1].setData(this.series2.data);
        }
      }, 0);
    },
    getLine(item) {
      const sortedData = [];
      item.bonds.forEach(bond => {
        this.bonds.find(item => {
          if (item.isin == bond) {
            sortedData.push({
              ...item,
              id: bond,
              y: item.profit,
              x: item.duration
            });
          }
        });
      });

      
      function byField(field) {
        return (a, b) => (a[field] > b[field] ? 1 : -1);
      }

      sortedData.sort(byField("x"));

      return sortedData;
    },
    async filterData(bonds, type) {
      const typesName = this.typeValue;
      const filtered = bonds.filter(function(bond) {
        switch (bond.type) {
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
      });

      let finalArr = filtered.sort((a, b) => a.name.localeCompare(b.name));
      if (this.filterIsin) {
        const isin = this.filterIsin.toUpperCase();
        finalArr = finalArr.filter(item => {
          return item.isin.toUpperCase().indexOf(isin) > -1;
        });
      }

      if (this.filterName) {
        const name = this.filterName.toUpperCase();
        finalArr = finalArr.filter(item => {
          return item.name.toUpperCase().indexOf(name) > -1;
        });
      }

      const emitent = this.emitentValue;
      let emitentArr = []
      finalArr.forEach(item => {
        emitent.forEach(emi => {
          if (item.emitent.shortname === emi) {
            emitentArr.push(item)
          }
        })
      });
      
      finalArr = emitentArr

      

      const sector = this.sectorValue
      let sectorArr = []
      finalArr.forEach(item => {
        sector.forEach(sec => {
          if(item.emitent.sector === sec) {
            sectorArr.push(item)
          }
        })
      });

      finalArr = sectorArr

      finalArr = finalArr.filter(item => {
        if (
          (this.profitRange[0] <= item.profit && this.profitRange[1] >= item.profit) &&
          ((this.profitRange[0] <= item.bid_yield && this.profitRange[1] >= item.bid_yield)) &&
          ((this.profitRange[0] <= item.ask_yield && this.profitRange[1] >= item.ask_yield)) 
        ) {
          return item;
        }
      });

      finalArr = finalArr.filter(item => {
        if (
          this.durationRange[0] <= item.duration &&
          this.durationRange[1] >= item.duration
        ) {
          return item;
        }
      });

      finalArr = finalArr.filter(item => {
        if (
          this.oborotRange[0] * 1000000 <= item.oborot &&
          this.oborotRange[1] * 1000000 >= item.oborot
        ) {
          return item;
        }
      });

      if( this.zeroOborot ) {
       finalArr = finalArr.filter(item => {
         if( item.oborot !== 0 ) return item 
       })
      }

      if( this.BidAskZero ) {
       finalArr = finalArr.filter(item => {
         if( item.bid !== 0 && item.ask !== 0) return item 
       })
      }

      this.items = finalArr;

      this.getScatters();

      if(type === 'user') {
        try {
          const filterData = {
            filterName: this.filterName,
            filterIsin: this.filterIsin,
            emitentValue: this.emitentValue,
            sectorValue: this.sectorValue,
            profitRange: this.profitRange,
            durationRange: this.durationRange,
            oborotRange: this.oborotRange,
            typeValue: this.typeValue,
          }
          await this.$store.dispatch('saveFilterData', filterData)
        } catch (e) {throw e}
      }

      setTimeout(() => {
        this.loadingOverlay = false;
      }, 500);
    },
    resetFilters() {
      this.filterName = "";
      this.filterIsin = "";
      this.emitentValue = this.emitentItems;
      this.sectorValue = this.sectorItems;
      this.profitRange = [4, 7];
      this.durationRange = [0, 5];
      this.oborotRange = [this.oborotRangeMin, this.oborotRangeMax];
      this.typeValue = this.typeItems;
      this.zeroOborot = false
      this.BidAskZero = false
      this.items = this.bonds;
      this.filterData(this.bonds);
    },
    editMarkerLine(line, marker) {
      const idx = this.chart.series.findIndex(item => item.name == line.name)

      if (idx == -1) {
        return
      }

      const color = this.chart.series[idx].color;
      let typeLine = this.chart.series[idx].type;
      let lineWidth = 3;

      if (typeLine == "line") {
        lineWidth = 3;
      } else if (typeLine == "scatter") {
        lineWidth = 0;
      }

      const seriesData = this.getLine(line);
      const series = {
        type: typeLine,
        name: line.name,
        color: color,
        lineWidth: lineWidth,
        marker: {
          lineColor: color,
          radius: 6,
          symbol: marker
        },
        stickyTracking: false,
        data: seriesData
      };

      this.chartsDeleteLine(line);
      this.chart.addSeries(series);
    },
    editColorLine(line, color) {
      const idx = this.chart.series.findIndex(item => item.name == line.name)

      if (idx == -1) {
        return
      }
      const marker = this.chart.series[idx].symbol;
      const seriesData = this.getLine(line);
      let typeLine = this.chart.series[idx].type;
      let lineWidth = 3;

      if (typeLine == "line") {
        lineWidth = 3;
      } else if (typeLine == "scatter") {
        lineWidth = 0;
      }

      const series = {
        type: typeLine,
        name: line.name,
        color: color,
        lineWidth: lineWidth,
        marker: {
          lineColor: color,
          radius: 6,
          symbol: marker
        },
        stickyTracking: false,
        data: seriesData
      };

      this.chartsDeleteLine(line);
      this.chart.addSeries(series);
    },
    editTypeLine(line) {
      const seriesIndex = this.chart.series.findIndex(
        item => item.name == line.name
      );

      if (seriesIndex == -1) {
        return;
      }
      
      const colors = this.chart.series[seriesIndex].color;
      const marker = this.chart.series[seriesIndex].symbol;
      let typeLine = this.chart.series[seriesIndex].type;
      let lineWidth = 3;

      if (typeLine == "line") {
        typeLine = "scatter";
        lineWidth = 0;
      } else if (typeLine == "scatter") {
        typeLine = "line";
        lineWidth = 3;
      }

      const seriesData = this.getLine(line);
      const series = {
        type: typeLine,
        name: line.name,
        color: colors,
        lineWidth: lineWidth,
        marker: {
          lineColor: colors,
          radius: 6,
          symbol: marker
        },
        stickyTracking: false,
        data: seriesData
      };

      this.chartsDeleteLine(line);
      this.chart.addSeries(series);
    },
    chartsCreateLine(line, color, marker, arr) {
      const seriesData = this.getLine(line);
      const seriesIndex = this.chart.series.findIndex(
        item => item.name == line.name
      );
      let typeLine = false;
      let resultType = false;
      let lineWidth = 3;

      if (seriesIndex != -1) {
        this.snackbar = true;
        this.snackbarstatus = "error";
        this.snackbarText = "Группа «" + line.name + "» уже отображена";
        return;
      }

      arr.forEach(item => {
        if (line.name == item) {
          resultType = true;
        }
      });

      if (resultType) {
        typeLine = "line";
        lineWidth = 3;
      } else {
        typeLine = "scatter";
        lineWidth = 0;
      }

      const series = {
        type: typeLine,
        name: line.name,
        color: color,
        lineWidth: lineWidth,
        marker: {
          lineColor: color,
          radius: 6,
          symbol: marker
        },
        stickyTracking: false,
        data: seriesData
      };
      
      this.chart.addSeries(series);
    },
    chartsDeleteLine(line) {
      const seriesIndex = this.chart.series.findIndex(
        item => item.name == line.name
      );
      this.chart.series[seriesIndex].remove();
    },
    async trashBaseLine(line) {
      await this.$store.dispatch("trashBaseLine", line);

      await this.$refs.settings.fetchBaseLine();

      this.snackbar = true;
      this.snackbarstatus = "success";
      this.snackbarText = "Группа «" + line.name + "» успешно удалена";
    },
    async trashUserGroup(group) {
      await this.$store.dispatch("trashUserGroup", group);

      await this.$refs.settings.fetchUserGroup();

      this.snackbar = true;
      this.snackbarstatus = "success";
      this.snackbarText = "Группа «" + group.name + "» успешно удалена";
    },
    getEmitentItems() {
      const tempArr = [];
      this.items.map(item => {
        tempArr.push(item.emitent.shortname);
      });

      tempArr.sort();

      for (let str of tempArr) {
        if (!this.emitentItems.includes(str) && str != null) {
          this.emitentItems.push(str);
        }
      }
      
    },
    getSectorItems() {
      const tempArr = [];
      this.items.map(items => {
        tempArr.push(items.emitent.sector);
      });

      tempArr.sort();


      for (let str of tempArr) {
        if (!this.sectorItems.includes(str) && str != null) {
          this.sectorItems.push(str);
        }
      }

      
      this.sectorItems.unshift(...this.sectorItems.splice(1, 1))
    },
    getMaxValue() {
      let profitMax = 0;
      let durationMax = 0;
      let oborotMax = 0;

      this.bonds.forEach(item => {
        if (item.profit > profitMax) {
          profitMax = item.profit;
        }
        if (item.duration > durationMax) {
          durationMax = item.duration;
        }
        if (item.oborot > oborotMax) {
          oborotMax = item.oborot;
        }
      });

      // this.profitRangeMax = Math.ceil(profitMax);
      this.durationRangeMax = Math.ceil(durationMax);
      this.oborotRangeMax = Math.ceil(oborotMax / 1000000);
    },
    getMinValue() {
      let profitMin = 0;
      let durationMin = 0;
      let oborotMin = 0;

      this.bonds.forEach(item => {
        if (item.profit < profitMin) {
          profitMin = item.profit;
        }
        if (item.duration < durationMin) {
          durationMin = item.duration;
        }
        if (item.oborot < oborotMin) {
          oborotMin = item.oborot;
        }
      });

      // this.profitRangeMin = Math.floor(profitMin);
      this.durationRangeMin = Math.floor(durationMin);
      this.oborotRangeMin = Math.floor(oborotMin / 1000000);
    }
  },
  computed: {
    likesAllItems() {
      return this.typeValue.length === this.typeItems.length;
    },
    likesAllItems1() {
      return this.emitentValue.length === this.emitentItems.length;
    },
    likesAllItems2() {
      return this.sectorValue.length === this.sectorItems.length;
    },
    likesSomeItems() {
      return this.typeValue.length > 0 && !this.likesAllItems;
    },
    icon() {
      if (this.likesAllItems) return "mdi-close-box";
      if (this.likesSomeItems) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    countSelectBonds() {
      return this.selected.length;
    },
    groupsName() {
      return this.$store.getters.groups;
    },
    isAdmin() {
      return this.$store.getters.info.isAdmin;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  components: {
    highcharts: Chart,
    Settings,
    Loader,
    ItemDialog: ItemDialog
  }
};
</script>
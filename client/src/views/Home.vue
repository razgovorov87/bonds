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
      <HomeTable v-else :constructor-type="'stockChart'" :chart="chart" :bonds="bonds" />
    </div>
    </v-col>

  </v-row>    
</template>

<style>

</style>

<script>
import HomeTable from '@/components/HomeTable'
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
    loading: true,
    scatters: [],
    error: '',
    chart: [],
    chartOptions: {}
  }),
  async created() {
    try {
      this.bonds = await BondsService.getBonds();
      this.bonds.map(bond => {
        this.scatters.push({
          id: bond.isin,
          name: bond.name,
          x: bond.duration,
          y: bond.profit
        })
      })
      this.chartOptions = {
      chart: {
        height: 700,
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
        title: {
          text: 'Дюрация(лет)'
        }
      },
      yAxis: {
        title: {
          text: 'Доходность, %'
        }
      },
      legend: {
          enabled: false
      },
      plotOptions: {
        series: {
          turboThreshold: 2000
        },
        scatter: {
          marker: {
            radius: 4,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              },
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
                headerFormat: '<b>{point.point.name}</b><br>',
                pointFormat: 'Дюрация: {point.x} лет<br> Доходность: {point.y}%'
            }
        }
      },
      series: [{
        data: this.scatters,
      }]
    }
    this.loading = false
    } catch (e) {
      this.error = e.message
    }
  },
  methods: {
    zoomChart() {
      this.chart.xAxis[0].setExtremes(0.825, 0.910)
    },
    async refreshPage() {
      this.loading = true
      this.bonds = await BondsService.getBonds();
      this.loading = false
    },
    selectScatter(item) {
      console.log(this.chart)
    }
  },
  mounted() {
    
  },
  components: {
    HomeTable,
    highcharts: Chart
  }
}
</script>

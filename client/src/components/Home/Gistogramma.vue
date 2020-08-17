<template>
    <highcharts ref="gistogramma" :options="options"></highcharts>
</template>

<script>

import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";

export default {
    props: ['chartData'],
    data: () => ({
        options: {},
        scatters: []
    }),

    mounted() {
        this.initChart()
         this.options = {
            chart: {
                height: 300,
                type: 'column'
            },
            yAxis: {
                type: 'logarithmic'
            },
            series: [{
                data: this.scatters
            }]
        }
    },


    methods: {
        initChart() {
            this.chartData.map( (item, ) => {
                this.scatters.push({
                    ask: item.ask,
                    bid: item.bid,
                    id: item.id,
                    last_price: item.last_price,
                    name: item.name,
                    oborot: item.oborot,
                    x: item.y,
                    y: item.oborot
                })
            })
        }
    },
 
    components: {
        highcharts: Chart
    }

}
</script>
<template>
    <div>
        <v-menu offset-y :close-on-click="false" :close-on-content-click="false" v-model="disableColorPicker"> 
            <template v-slot:activator="{ on }">
                <v-btn class="ml-3" v-on="on" x-small label :color="lineColor"></v-btn>
            </template>
            <v-color-picker v-model="lineColor" mode='hexa' class="line__color" dark hide-canvas hide-inputs show-swatches :swatches="swatches"></v-color-picker>
            <v-btn color="success" class="elevation-0 white--text" width="100%" @click="changeColor(line)">Применить</v-btn>
        </v-menu>
        <v-menu offset-y :close-on-click="false" v-model="disableMarkerLine"> 
            <template v-slot:activator="{ on }">
                <v-chip class="ml-3 white black--text" v-on="on" small label><v-icon class="black--text" small>{{selectedMarker}}</v-icon></v-chip>
            </template>
            <v-list dense>
                <v-list-item link v-for="marker of markers" :key="marker" @click="changeMarker(line, marker)">
                    <v-icon class="black--text" small>{{marker}}</v-icon>
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    props: ['line'],
    data: () => ({
        swatches: [
        ['#FF0000',
        '#FF8C00',],
        ['#FFFF00',
        '#00FF00'],
        ['#00CED1',
        '#0000FF',],
        ['#FF00FF',
        '#000000',],
        ['#808080',
        '#B8860B']
        ],
        lineColor: '',
        disableColorPicker: 0,
        disableMarkerLine: 0,
        markers: ['mdi-circle', 'mdi-square', 'mdi-rhombus', 'mdi-triangle'],
        selectedMarker: 'mdi-circle'
    }),
    created() {

        this.lineColor = this.line.color
    },
    methods: {
        changeColor(line) {
            this.disableColorPicker = 0
            const lineColor = this.lineColor
            this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.editColorLine(line, lineColor)
        },
        changeMarker(line, marker) {
            this.selectedMarker = marker
            if( marker === 'mdi-circle') {marker = 'circle'}
            else if  (marker === 'mdi-square') {marker = 'square'}
            else if  (marker === 'mdi-rhombus') {marker = 'diamond'}
            else if  (marker === 'mdi-triangle') {marker = 'triangle'}
            this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.editMarkerLine(line, marker)
        }
    }
}
</script>
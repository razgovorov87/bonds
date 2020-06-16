<template>
    <v-menu offset-y :close-on-click="false" :close-on-content-click="false" v-model="disableColorPicker"> 
        <template v-slot:activator="{ on }">
            <v-btn class="ml-2" v-on="on" x-small label :color="lineColor"></v-btn>
        </template>
        <v-color-picker v-model="lineColor" mode='hexa' class="line__color" dark></v-color-picker>
        <v-btn color="success" class="elevation-0 white--text" width="100%" @click="changeColor(line)">Применить</v-btn>
    </v-menu>
</template>

<script>
export default {
    props: ['line'],
    data: () => ({
        lineColor: '',
        disableColorPicker: 0
    }),
    created() {
        this.lineColor = this.line.color
    },
    methods: {
        changeColor(line) {
            this.disableColorPicker = 0
            const lineColor = this.lineColor
            this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.editColorLine(line, lineColor)
        }
    }
}
</script>
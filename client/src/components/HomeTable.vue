<template>
      <v-data-table
          v-model="selected"
          :headers="headers"
          :items-per-page="15"
          :items="bonds"
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
</template>

<script>
export default {
    props: ['bonds', 'chart'],
    data: () => ({
        items: [],
        selected: [],
        headers: [           
            {text: 'Название', value: 'name', align: 'center', sortable: false},
            {text: 'ISIN',  value: 'isin', sortable: false},
            {text: 'Доходность', value: 'profit'},
            {text: 'Дюрация', value: 'duration'},
            {text: 'Тип', value: 'type'},
            {text: 'Тип.расчетов', value: 'ras'}
        ],
    }),
    created() {
        this.items = this.bonds
    },
    mounted() {
    },
    methods: {
      selectScatter(item){
        this.$parent.$options.methods.selectScatter(item)
      }
      
    },
}
</script>
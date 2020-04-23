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
        <template v-slot:item.isin="{ item }">
          <v-btn
            color="primary"
          >
            {{item.isin}}
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
            {text: 'ISIN', align: 'center', value: 'isin', sortable: false},
            {text: 'Название', value: 'name'},
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
}
</script>
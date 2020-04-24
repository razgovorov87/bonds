<template>
      <v-card>
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
            >
            </v-select>
              <v-btn
                color="primary"
                type="submit"
              >
                Фильтр
              </v-btn>
            </v-form>
        </v-card-title>
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
</template>

<script>
export default {
    props: ['items', 'chart'],
    data: () => ({
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
            {text: 'Тип', value: 'type'},
            {text: 'Тип расчетов', value: 'ras'}
        ],
    }),
    created() {
        this.typeValue = this.typeItems
    },
    mounted() {
    },
    methods: {
      selectScatter(item){
        this.$parent.$options.methods.selectScatter(item)
      },
      filterData() {
        this.$parent.$options.methods.filterData(this.typeValue)
      }
      
    },
}
</script>
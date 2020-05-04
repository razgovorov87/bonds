<template>
    <div>
        <v-list-item
            dark
        >
            <v-list-item-title class="headline">Построения</v-list-item-title>
        </v-list-item>
        <v-skeleton-loader
            v-if="loading"
            type="article"
            dark
        ></v-skeleton-loader>
        <v-list
            v-else
            dark
            class="mt-2"
        >
        
        <v-subheader>БАЗОВЫЕ ЛИНИИ</v-subheader>

        <div v-if="!baseLines" class="d-flex justify-center" style="width: 100%">
            <v-chip >
                <span class="px-2">Базовые линии не созданы</span>
            </v-chip>
        </div>

        <v-list-item v-else v-for="line in baseLines" :key="line.name" class="mb-2">
            <v-card class="d-flex align-center justify-space-between px-2" style="width: 100%">
                <v-list-item>{{line.name}}</v-list-item>
                <div class="d-flex">
                    <v-btn
                        color="success"
                        class="mr-2"
                        small
                        @click="createLine(line)"
                    >
                        <v-icon>mdi-chart-line</v-icon>
                    </v-btn>
                    <v-btn
                        color="error"
                        small
                        @click="deleteLine(line)"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-card>
            
        
        </v-list-item>
        <v-dialog v-if="isAdmin" v-model="dialogAddBaseLine" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-list-item class="mt-2">
                <div class="d-flex justify-center" style="width: 100%">
                    <v-card>
                    <v-btn
                        text
                        v-on="on"
                        color="primary"
                        class="font-weight-bold"
                    >
                        Создать базовую линию
                    </v-btn>
                </v-card>
                </div>
            </v-list-item>
        </template>
        <v-card>
            <v-card-title>
            <span class="headline">Создание базовой линии</span>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                <v-col cols="12" sm="12" md="12">
                    <v-text-field 
                    label="Название группы" 
                    v-model="baseLineName" 
                    required 
                    :rules="baseLineNameRules"
                    ></v-text-field>
                </v-col>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogAddBaseLine = false">Закрыть</v-btn>
            <v-btn color="primary" @click="createBaseLine()">Создать</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        
        </v-list>
    </div>
</template>


<script>
import {required} from 'vuelidate/lib/validators'
export default {
    data: () => ({
        loading: true,
        baseLines: [],
        dialogAddBaseLine: false,
        baseLineName: '',
        baseLineNameRules: [
            v => !!v || 'Введите название',
        ]
    }),
    validations: {
        baseLineName: {required}
    },
    async created() {
        this.baseLines = await this.$store.dispatch('fetchBaseLine')

        this.loading = false
    },
    methods: {
        async fetchBaseLine() {
            this.loading = true
            this.baseLines = await this.$store.dispatch('fetchBaseLine')
            this.loading = false
        },
        createLine(line) {
            this.$parent.$parent.chartsCreateLine(line)
        },
        deleteLine(line) {
            this.$parent.$parent.chartsDeleteLine(line)
        },
        createBaseLine() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            this.dialogAddBaseLine = false
            const item = this.baseLineName
            this.$parent.$parent.createBaseLine(item)
        }
    },
    computed: {
        isAdmin() {
            return this.$store.getters.info.isAdmin
        }
    },
}
</script>
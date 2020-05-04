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
            class="mb-2"
        ></v-skeleton-loader>
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
        
        <v-subheader>БАЗОВЫЕ ГРУППЫ</v-subheader>

        <div v-if="!baseLines" class="d-flex justify-center" style="width: 100%">
            <v-chip >
                <span class="px-2">Базовые группы не созданы</span>
            </v-chip>
        </div>

        <v-list-item v-else v-for="line in baseLines" :key="line.name" class="mb-2">
            <v-card class="d-flex align-center justify-space-between px-2" style="width: 100%">
                <v-list-item>{{line.name}}</v-list-item>
                <div class="d-flex">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="success"
                                class="mr-2"
                                small
                                @click="createLine(line)"
                                v-on="on"
                            >
                                <v-icon>mdi-chart-line</v-icon>
                            </v-btn>
                        </template>
                        <span>Отобразить группу</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="error"
                                small
                                @click="deleteLine(line)"
                                v-on="on"
                            >
                                <v-icon>mdi-chart-line</v-icon>
                            </v-btn>
                        </template>
                        <span>Стереть группу</span>
                    </v-tooltip>
                    
                    <v-tooltip v-if="isAdmin" bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="error"
                                small
                                icon
                                v-on="on"
                                @click="trashBaseLine(line)"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Удалить группу</span>
                    </v-tooltip>
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
                        Создать базовую группу
                    </v-btn>
                </v-card>
                </div>
            </v-list-item>
        </template>
        <v-card>
            <v-card-title>
            <span class="headline">Создание группы</span>
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
                    <v-chip
                        v-if="error"
                        color="error"
                    >
                    {{error}}
                    </v-chip>
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
        

         <v-subheader>МОИ ГРУППЫ</v-subheader>
            <div v-if="!userGroups" class="d-flex justify-center" style="width: 100%">
                <v-chip >
                    <span class="px-2">У вас нет созданных групп</span>
                </v-chip>
            </div>
            <v-list-item v-else v-for="group in userGroups" :key="group.name" class="mb-2">
            <v-card class="d-flex align-center justify-space-between px-2" style="width: 100%">
                <v-list-item>{{group.name}}</v-list-item>
                <div class="d-flex">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="success"
                                class="mr-2"
                                small
                                v-on="on"
                                @click="createUserGroupLine(group)"
                            >
                                <v-icon>mdi-chart-line</v-icon>
                            </v-btn>
                        </template>
                        <span>Отобразить группу</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="error"
                                class="mr-2"
                                small
                                v-on="on"
                                @click="deleteUserGroupLine(group)"
                            >
                                <v-icon>mdi-chart-line</v-icon>
                            </v-btn>
                        </template>
                        <span>Стереть группу</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="error"
                                small
                                icon
                                v-on="on"
                                @click="trashUserGroup(group)"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Удалить группу</span>
                    </v-tooltip>
                </div>
            </v-card>
            
        
        </v-list-item>
            <v-dialog v-model="dialogAddUserGroup" persistent max-width="600px">
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
                            Создать группу
                        </v-btn>
                    </v-card>
                    </div>
                </v-list-item>
            </template>
            <v-card>
                <v-card-title>
                <span class="headline">Создание группы</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-text-field 
                        label="Название группы" 
                        v-model="userGroupName" 
                        required 
                        :rules="userGroupNameRules"
                        ></v-text-field>
                        <v-chip
                            v-if="error"
                            color="error"
                        >
                        {{error}}
                        </v-chip>
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogAddUserGroup = false">Закрыть</v-btn>
                <v-btn color="primary" @click="createUserGroup()">Создать</v-btn>
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
        dialogAddUserGroup: false,
        baseLineName: '',
        baseLineNameRules: [
            v => !!v || 'Введите название',
        ],
        userGroupName: '',
        userGroupNameRules: [
            v => !!v || 'Введите название',
        ],
        userGroups: [],
        error: ''
    }),
    async created() {
        this.baseLines = await this.$store.dispatch('fetchBaseLine')
        this.userGroups = await this.$store.dispatch('fetchUserGroup')

        this.loading = false
    },
    methods: {
        async fetchBaseLine() {
            this.loading = true
            this.baseLines = await this.$store.dispatch('fetchBaseLine')
            this.loading = false
        },
        async fetchUserGroup() {
            this.loading = true
            this.userGroups = await this.$store.dispatch('fetchUserGroup')
            this.loading = false
        },
        createLine(line) {
            this.$parent.$parent.chartsCreateLine(line)
        },
        deleteLine(line) {
            this.$parent.$parent.chartsDeleteLine(line)
        },
        trashBaseLine(line) {
            this.$parent.$parent.trashBaseLine(line)
        },
        createUserGroupLine(group) {
            this.$parent.$parent.chartsCreateLine(group)
        },
        deleteUserGroupLine(group) {
            this.$parent.$parent.chartsDeleteLine(group)
        },
        trashUserGroup(group) {
            this.$parent.$parent.trashUserGroup(group)
        },
        async createBaseLine() {
            const result = await this.$store.dispatch('fetchBaseLineDublicate', this.baseLineName)
            if(this.baseLineName == '') {
                return
            } else if (result) {
                this.error = 'Группа с таким именем уже существует'
                setTimeout(() => {
                    this.error = ''
                }, 5000)
                return
            }
            this.dialogAddBaseLine = false
            const item = this.baseLineName
            this.baseLineName = ''
            this.$parent.$parent.createBaseLine(item)
        },
        async createUserGroup() {
            const result = await this.$store.dispatch('fetchUserGroupDublicate', this.userGroupName)
            if(this.userGroupName == '') {
                return
            } else if (result) {
                this.error = 'Группа с таким именем уже существует'
                setTimeout(() => {
                    this.error = ''
                }, 5000)
                return
            }
            this.dialogAddUserGroup = false
            const item = this.userGroupName
            this.userGroupName = ''
            this.$parent.$parent.createUserGroup(item)
        }
    },
    computed: {
        isAdmin() {
            return this.$store.getters.info.isAdmin
        }
    },
}
</script>
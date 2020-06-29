<template>
    <div>
        <v-list-item
        dark
        >
            <v-list-item-title class="headline">Построения</v-list-item-title>
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click.stop="closeDrawer()"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-list-item>
        <div v-if="loading" class="d-flex justify-center mt-5" style="width: 100%">
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>
        <v-list
            v-else
            dark
            class="mt-2"
            id="settings__list"
        >
        
        <v-subheader>БАЗОВЫЕ ГРУППЫ</v-subheader>

        <div v-if="!baseLines" class="d-flex justify-center" style="width: 100%">
            <v-chip >
                <span class="px-2">Базовые группы не созданы</span>
            </v-chip>
        </div>

        <v-list-item v-else v-for="line in baseLines" :key="line.name" class="mb-2" two-line>
            <v-card class="d-flex px-2 flex-column" style="width: 100%">
                <div class="d-flex align-center justify-space-between" style="width: 100%">
                    <v-list-item>
                        {{line.name}} 
                        <LineColor :ref="line.id + '_color'" :line="line"/>
                    </v-list-item>
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
                            <span>Скрыть группу</span>
                        </v-tooltip>
                        
                        <v-tooltip v-if="isAdmin" bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    color="error"
                                    small
                                    icon
                                    v-on="on"
                                    @click="agreeDeleteGroup(line, 'baseLine')"
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Удалить группу</span>
                        </v-tooltip>
                    </div>
                </div>
                <v-divider style="border-color: rgba(255,255,255, 0.3)"></v-divider>
                <div class="d-flex pa-3 align-center justify-space-between">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" small @click="showBondsList(line, 'baseLine')">
                                Список
                            </v-btn>
                        </template>
                        <span>Показать список</span>
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
                    :counter="15" 
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
            <v-btn color="primary font-weight-bold" @click="createBaseLine()">Создать</v-btn>
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
            <v-card class="d-flex flex-column px-2" style="width: 100%">
                <div class="d-flex align-center justify-space-between" style="width: 100%">
                    <v-list-item>
                        {{group.name}} 
                        <LineColor :ref="group.id + '_color'" :line="group"/>
                    </v-list-item>
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
                            <span>Скрыть группу</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    color="error"
                                    small
                                    icon
                                    v-on="on"
                                    @click="agreeDeleteGroup(group, 'userGroup')"
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Удалить группу</span>
                        </v-tooltip>
                    </div>
                </div>
                <v-divider style="border-color: rgba(255,255,255, 0.3)"></v-divider>
                <div class="d-flex pa-3 align-center justify-space-between">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" small @click="showBondsList(group, 'userGroup')">
                                Список
                            </v-btn>
                        </template>
                        <span>Показать список</span>
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
                        :counter="15"
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
                <v-btn color="primary font-weight-bold" @click="createUserGroup()">Создать</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialog" max-width="520">
                <v-card>
                    <v-card-title class="headline">Вы действительно хотите удалить группу?</v-card-title>

                    <v-card-text>
                    Помните, что после удаления восстановить группу не получиться
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary darken-1"
                        text
                        @click="deleteDialog = false"
                    >
                        Отмена
                    </v-btn>

                    <v-btn
                        color="error darken-1 font-weight-bold"
                        @click="deleteGroup()"
                    >
                        Да, удалить
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog
                v-model="bondDialog"
                max-width="520"
            >
            <v-card>
                <v-toolbar class="info" dark>
                    <v-toolbar-title>Список «{{bondDialogTitle}}»</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.stop="bondDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                
                <v-card-text style="min-height: 300px">
                    <div v-if="bondDialogLoading" class="d-flex justify-center align-center" style="height: 300px">
                        <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                        ></v-progress-circular>
                    </div>
                    <v-simple-table v-else width="100%">
                        <thead>
                            <th class="text-left">Название</th>
                            <th class="text-left">ISIN</th>
                            <th class="text-left"></th>
                        </thead>
                        <tbody>
                            <tr v-for="bond of bondsList" :key="bond.isin">
                                <td>
                                    <v-btn class="primary" @click="showItemDialog(bond)">{{bond.name}}</v-btn>
                                </td>
                                <td>{{bond.isin}}</td>
                                <td>
                                    <v-tooltip v-if="isAdmin" right>
                                        <template v-slot:activator="{ on }">
                                            <v-btn icon v-on="on" @click="deleteBondOnList(bond.isin)">
                                                <v-icon class="red--text">mdi-delete</v-icon>
                                            </v-btn>
                                        </template>
                                        <span class="font-weight-bold">Удалить {{bond.name}}</span>
                                    </v-tooltip>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-card-text>
            </v-card>
            </v-dialog>

        </v-list>
    </div>
</template>

<style>
.v-input__append-outer {
    margin-left: -5px !important;
    
}
.v-input__prepend-outer .v-input__icon--prepend i::before {
    font-size: 22px;
}
.v-input__append-outer .v-input__icon--append i::before {
    font-size: 20px;
}
#settings__list {
    background-color: #060818 !important;
}
</style>

<script>
import LineColor from '@/components/Home/LineColor'
import {required, maxLength} from 'vuelidate/lib/validators'
export default {
    data: () => ({
        loading: true,
        lineColor: '',
        typeLine: [],
        baseLines: [],
        deletableTypeGroup: '',
        deletebleGroup: '',
        dialogAddBaseLine: false,
        dialogAddUserGroup: false,
        deleteDialog: false,
        bondDialog: false,
        bondDialogTitle: '',
        bondDialogLoading: true,
        groupName: '',
        baseLineName: '',
        baseLineNameRules: [
            v => !!v || 'Введите название',
            v => v.length <= 15 || 'Превышено допустимое кол-во символов',
        ],
        userGroupName: '',
        userGroupNameRules: [
            v => !!v || 'Введите название',
            v => v.length <= 15 || 'Превышено допустимое кол-во символов',
        ],
        userGroups: [],
        error: '',
        bondsList: [],
        typeGroup: ''
    }),
    async created() {
        this.baseLines = await this.$store.dispatch('fetchBaseLine')
        this.userGroups = await this.$store.dispatch('fetchUserGroup')

        this.loading = false
    },
    methods: {
        showItemDialog(bond) {
            // this.bondDialog = false
            this.$parent.$parent.showItemDialog(bond)
        },
        showBondsList(group, type) {
            this.bondsList = []
            this.typeGroup = type
            this.groupName = group
            this.$parent.$parent.bonds.filter(bond => {
                group.bonds.forEach(item => {
                    if(bond.isin == item) {
                        this.bondsList.push(bond)
                    }
                })
            })

            this.bondDialog = true
            this.bondDialogTitle = group.name
            this.bondDialogLoading = false
        },
        async deleteBondOnList(bond) {
            if( !this.isAdmin ) {
                this.$parent.$parent.snackbar = true
                this.$parent.$parent.snackbarstatus = 'error'
                this.$parent.$parent.snackbarText = 'Вы не можете удалить данные элементы'
                return
            }
            this.bondDialogLoading = true
            this.bondsList = []
            const group = this.groupName
            const index = group.bonds.findIndex(item => item == bond)
            group.bonds.splice(index, 1)
            if( this.typeGroup === 'userGroup') {
                await this.$store.dispatch('deleteUserBondOnList', {group})
            }
            if( this.typeGroup === 'baseLine') {
                await this.$store.dispatch('deleteBaseBondOnList', {group, bond})
            }
            this.$parent.$parent.bonds.filter(bond => {
                group.bonds.forEach(item => {
                   if(bond.isin == item) {
                        this.bondsList.push(bond)
                    }
                })
            })
            this.bondDialogLoading = false
        },
        editTypeLine(line) {
            this.$parent.$parent.editTypeLine(line)
        },
        closeDrawer() {
            this.$parent.$parent.settingsDrawer = false
        },
        agreeDeleteGroup(group, type) {
            this.deleteDialog = true
            this.deletebleGroup = group
            this.deletableTypeGroup = type
        },
        deleteGroup() {
            if(this.deletableTypeGroup == 'userGroup') {
                this.trashUserGroup(this.deletebleGroup)
            } else if (this.deletableTypeGroup == 'baseLine') {
                this.trashBaseLine(this.deletebleGroup)
            }
        },
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
            const color = this.$refs[line.id + '_color'][0].lineColor
            const symbol = this.$refs[line.id + '_color'][0].selectedMarker
            let marker = ''
            if( symbol === 'mdi-circle') {marker = 'circle'}
            else if  (symbol === 'mdi-square') {marker = 'square'}
            else if  (symbol === 'mdi-rhombus') {marker = 'diamond'}
            else if  (symbol === 'mdi-triangle') {marker = 'triangle'}
            this.$parent.$parent.chartsCreateLine(line, color, marker, this.typeLine)
        },
        deleteLine(line) {
            this.$parent.$parent.chartsDeleteLine(line)
        },
        trashBaseLine(line) {
            this.deleteDialog = false
            this.$parent.$parent.trashBaseLine(this.deletebleGroup)
            this.deletebleUserGroup = ''
        },
        createUserGroupLine(group) {
            const color = this.$refs[group.id + '_color'][0].lineColor
            const symbol = this.$refs[group.id + '_color'][0].selectedMarker
            let marker = ''
            if( symbol === 'mdi-circle') {marker = 'circle'}
            else if  (symbol === 'mdi-square') {marker = 'square'}
            else if  (symbol === 'mdi-rhombus') {marker = 'diamond'}
            else if  (symbol === 'mdi-triangle') {marker = 'triangle'}
            this.$parent.$parent.chartsCreateLine(group, color, marker, this.typeLine)
        },
        deleteUserGroupLine(group) {
            this.$parent.$parent.chartsDeleteLine(group)
        },
        trashUserGroup() {
            this.deleteDialog = false
            this.$parent.$parent.trashUserGroup(this.deletebleGroup)
            this.deletebleUserGroup = ''
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
    components: {
        LineColor
    }
}
</script>
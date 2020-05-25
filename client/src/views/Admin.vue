<template>

    <Loader v-if="loading" text="Загружаем данные..." />
    <v-row v-else>
        <v-col cols="8">
            <v-card>
                <v-card-title>Список пользователей</v-card-title>
                <v-data-table :headers="usersTableHeaders" :items="usersTableItems" :loading="loadingTable" loading-text="Получаем список пользователей..." :item-key="usersTableItems.email" hide-default-footer>

                    <template v-slot:header.avatar="{ on }">
                        <v-icon v-on="on">mdi-account</v-icon>
                    </template>

                    <template v-slot:item.avatar="{ item }">
                        <v-avatar v-if="item.avatar" size="40" color="primary">
                            <v-img :src="item.avatar"></v-img>
                        </v-avatar>
                        <v-avatar v-else class="white--text" size="40" color="primary">
                           {{item.name[0].toUpperCase()}}
                        </v-avatar>
                    </template>

                    <template v-slot:item.admin="{ item }">
                        <v-chip v-if="item.admin" small label class="red lighten-4 red--text mr-2 font-weight-bold">Администратор</v-chip>
                        <v-chip small label class="green lighten-4 green--text mr-2 font-weight-bold">Пользователь</v-chip>
                        <v-menu
                            transition="slide-x-transition"
                            :close-on-content-click="false"
                        >
                            <template v-slot:activator="{ on }">
                                <v-chip small label class="font-weight-bold subtitle-1 grey lighten-4" v-on="on">+</v-chip>
                            </template>
                            <v-list dense>
                                <v-list-item disabled link class="grey lighten-3" @click="toggleRules(item, 'standart')">
                                    <v-chip label small class="green lighten-2"></v-chip>
                                    <v-list-item class="body-2"><span class="grey--text">Пользователь</span></v-list-item>
                                </v-list-item>
                                <v-list-item link @click="toggleRules(item, 'admin')">
                                    <v-chip label small class="red"></v-chip>
                                    <v-list-item class="body-2">Администратор</v-list-item>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>

                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="4">
            <v-card>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import Loader from '@/components/Loader'
export default {
    data: () => ({
        usersTableHeaders: [
            {text: '', value: 'avatar', sortable: false, width: '50px', align: 'center'},
            {text: 'Имя', value: 'name'},
            {text: 'Email', value: 'email'},
            {text: 'Права', value: 'admin'}
        ],
        usersTableItems: [],
        loading: true,
        loadingTable: false,
        userRulesStandart: true,
        userRulesAdmin: false
    }),
    async created() {
        const userList = await this.$store.dispatch('fetchUserList')
        userList.map(user => {
            this.usersTableItems.push({
                avatar: user.info.avatar,
                name: user.info.name,
                email: user.info.email,
                admin: user.info.isAdmin,
                id: user.id
            })
        })

        this.loading = false
    },
    methods: {
        async toggleRules(item, rules) {
            this.loadingTable = true
            await this.$store.dispatch('getUserRules', {
                item,
                rules
            })
            this.usersTableItems = []
            const userList = await this.$store.dispatch('fetchUserList')
            userList.map(user => {
                this.usersTableItems.push({
                    avatar: user.info.avatar,
                    name: user.info.name,
                    email: user.info.email,
                    admin: user.info.isAdmin,
                    id: user.id
                })
            })
            this.loadingTable = false
        }
    },
    computed: {
    },
    components: {
        Loader
    }
}
</script>
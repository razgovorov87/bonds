<template>
    <div v-if="loading" width="100%" class="d-flex justify-center align-center" style="min-height: 150px;">
        <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
        ></v-progress-circular>
    </div>
    <v-timeline v-else dense>
        <v-timeline-item small v-for="log in logList" :key="log.version" :color="log.color">
            <v-card class="elevation-2">
                <v-card-title class="d-flex justify-space-between">
                    <div class="ma-0 pa-0">
                        <v-tooltip small bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn @click="showMore(log)" v-on="on" class="font-weight-bold white--text" label small :color="log.color">v{{log.version}}</v-btn>
                            </template>
                            <span>Подробнее</span>
                        </v-tooltip>
                        <span class="body-2 ml-2" :class="log.titleClass">{{log.title}}</span>
                    </div>
                    <span class="overline font-weight-bold grey--text">{{log.date}}</span>
                </v-card-title>
            </v-card>
        </v-timeline-item>
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title class="headline white--text d-flex align-center justify-space-between elevation-2" :class="item.color">
                    <span>v{{item.version}}</span>
                    <v-btn icon>
                        <v-icon @click="dialog = false" color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="mt-2">
                    <v-list dense>
                        <v-list-item v-for="e in item.logs" :key="e" class="caption text-uppercase">
                            <span>
                                <span class="body-1">•</span>
                                {{e}}
                            </span>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-timeline>
</template>

<script>
import changelog from '@/changelog'
export default {
    data: () => ({
        logList: [],
        loading: true,
        dialog: false,
        item: {}
    }),
    mounted() {
        this.logList = Object.keys(changelog).map(log => ({...changelog[log], version: log})).reverse()
        this.loading = false
    },
    methods: {
        showMore(log) {
            this.item = log
            this.dialog = true
        }
    }
}
</script>
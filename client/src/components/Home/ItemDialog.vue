<template>
  <div>
    <DialogDrag
      v-for="dialog in dialogs"
      :key="dialog.id"
      :id="dialog.id"
      class="dialog-1 item__dialog"
      :options="dialog.options"
    >
      <v-card @click="selectDialog(dialog)" :ripple="false">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="removeDialog(dialog)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="px-0">{{dialog.bond.name}}</v-toolbar-title>
          <v-divider vertical inset class="mx-2"></v-divider>
          <v-chip class="subtitle white black--text d-flex align-center">
            <span class="mr-1 grey--text">ISIN</span>
            {{dialog.bond.isin}}
          </v-chip>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div>
          <v-list dense>
            <v-subheader>Основная информация</v-subheader>
            <v-list-item>
              <span v-if="dialog.bond.profit > 0" class="subtitle-2">
                Профит:
                <span class="teal--text font-weight-bold ml-2">{{dialog.bond.profit}}%</span>
                <v-icon size="20px" color="teal">mdi-arrow-up</v-icon>
              </span>
              <span v-if="dialog.bond.profit < 0" class="subtitle-2">
                Профит:
                <span class="red--text font-weight-bold ml-2">{{dialog.bond.profit}}%</span>
                <v-icon size="20px" color="red">mdi-arrow-down</v-icon>
              </span>
            </v-list-item>

            <v-list-item>
              <span class="subtitle-2">
                Дюрация:
                <span class="font-weight-bold ml-2">{{dialog.bond.duration}} лет</span>
              </span>
            </v-list-item>

            <v-list-item>
              <span class="subtitle-2">
                Последняя цена:
                <span class="font-weight-bold ml-2">{{dialog.bond.last_price}}</span>
              </span>
            </v-list-item>

            <v-list-item>
              <span class="subtitle-2">
                Лучший спрос:
                <span class="font-weight-bold ml-2">{{dialog.bond.best_spros}}</span>
              </span>
            </v-list-item>

            <v-list-item>
              <span class="subtitle-2">
                Лучший предложение:
                <span class="font-weight-bold ml-2">{{dialog.bond.best_predl}}</span>
              </span>
            </v-list-item>

            <v-list-item>
              <span class="subtitle-2">
                Оборот:
                <span class="font-weight-bold ml-2">{{dialog.bond.oborot}}</span>
              </span>
            </v-list-item>

            <v-list-item>
              <span class="subtitle-2">
                Тип:
                <span class="font-weight-bold ml-2">{{dialog.bond.type}}</span>
              </span>
            </v-list-item>

            <v-expansion-panels focusable hover v-if="dialog.bond.emitent">
              <v-expansion-panel>
                <v-expansion-panel-header class="subtitle-2 pl-4">Эмитент</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list dense>
                    <v-list-item>
                      <span class="subtitle-2">
                        Полное название:
                        <span
                          class="font-weight-bold ml-2"
                        >{{dialog.bond.emitent.fullname}}</span>
                      </span>
                    </v-list-item>

                    <v-list-item>
                      <span class="subtitle-2">
                        Краткое название:
                        <span
                          class="font-weight-bold ml-2"
                        >{{dialog.bond.emitent.shortName}}</span>
                      </span>
                    </v-list-item>

                    <v-list-item>
                      <span class="subtitle-2">
                        Сектор:
                        <span class="font-weight-bold ml-2">{{dialog.bond.emitent.sector}}</span>
                      </span>
                    </v-list-item>

                    <v-list-item>
                      <span class="subtitle-2">
                        Тип компании:
                        <span
                          class="font-weight-bold ml-2"
                        >{{dialog.bond.emitent.company_type}}</span>
                      </span>
                    </v-list-item>

                    <v-list-item>
                      <span class="subtitle-2">
                        ИНН:
                        <span class="font-weight-bold ml-2">{{dialog.bond.emitent.inn}}</span>
                      </span>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-list>
        </div>
      </v-card>
    </DialogDrag>
  </div>
</template>

<script>
import DialogDrag from "vue-dialog-drag";
export default {
  data: () => ({
    itemDialog: false,
    dialogs: []
  }),
  methods: {
    selectDialog(dialog) {
      const allItems = document.querySelectorAll('.dialog-drag')
      const selected = document.querySelector(`#${dialog.id}`)
      allItems.forEach(item => item.style.zIndex = 900)
      selected.style.zIndex = 999
    },
    removeDialog(dialog) {
      const dialogIdx = this.dialogs.findIndex(item => item.id == dialog.id)
      this.dialogs.splice(dialogIdx, 1)
      const itemIdx = this.$parent.selected.findIndex(item => item.isin == dialog.id)
      this.$parent.selectPoint[itemIdx].setState('normal')
      this.$parent.selectPoint.splice(itemIdx, 1)
      this.$parent.selected.splice(itemIdx, 1)
    }
  },
  components: {
    DialogDrag
  }
};
</script>

<style>
.item__dialog {
  min-width: 550px !important;
}
.v-list {
  padding-bottom: 0;
}
.dialog-drag {
  border: none !important;
  padding: 0 !important;
}
.dialog-drag .dialog-header {
  padding: 0 !important;
}
.dialog-drag .dialog-body {
  padding: 0 !important;
}
</style>
<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>
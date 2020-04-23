<template>
    <v-container
        class="fill-height ma-0 pa-0"
        fluid
    >
   <v-row
    class="fill-height"
   >
       <v-col
        class="white d-flex align-center justify-center"
        >
           <v-card
            color="rgba(255, 255, 255, 0)"
            elevation="0"
            class="black--text"
           >
               <router-view />
           </v-card>
       </v-col>

       <v-col
        class="black d-flex align-center justify-center"
       >
           <v-card
            color="rgba(255, 255, 255, 0)"
            elevation="0"
           >
            <v-img 
                src="@/assets/logo.svg" 
                max-height="300px"
                max-width="300px"
            ></v-img>
           </v-card>
       </v-col>
   </v-row>
    </v-container>
</template>

<script>
import Login from '@/views/Login'
export default {
    created () {
      this.$vuetify.theme.dark = true
    },
    components: {
        Login
    }
}
</script>
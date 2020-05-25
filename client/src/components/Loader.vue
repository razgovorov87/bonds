<template>
    <v-overlay opacity="0.6" value="true">
      <div class="d-flex justify-center align-center">

        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          class="mr-3"
        ></v-progress-circular>
        <span>{{text}}</span>

      </div>
    </v-overlay>
</template>

<script>
export default {
    props: ['text']
}
</script>
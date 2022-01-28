<template>
  <v-app>
    <Navigation/>
    <v-main>
      <v-container fluid>
        <v-row justify="center" dense>
          <v-col cols="12" sm="4">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '@/components/common/Navigation.vue';
import Footer from '@/components/common/Footer.vue';

export default defineComponent({
  name: 'App',

  components: {
    Navigation,
    Footer,
  },
  data () {
    return {
      //
    }
  },
})
</script>

<style lang="scss">
</style>

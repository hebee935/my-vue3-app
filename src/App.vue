<template>
  <v-app full-height>
    <Navigation/>
    <v-main class="full-height">
      <v-container fluid class="full-height">
        <v-row justify="center" no-gutters class="full-height">
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
    }
  },
})
</script>

<style scoped>
.full-height {
  height:100%
}
</style>

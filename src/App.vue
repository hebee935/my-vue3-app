<template>
  <q-layout view="hHh lpR fFf">
    <Header />

    <q-page-container class="q-pa-md">
      <div class="row justify-center">
        <div class="col-12 col-md-6">
          <router-view />
        </div>
      </div>
    </q-page-container>

    <Footer/>
  </q-layout>
</template>

<script>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  }
}
</script>

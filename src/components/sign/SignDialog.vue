<template>
  <Dialog ref="dialog">
    <v-card>
      <Signin v-if="page.signin" v-on:close="close"/>
      <Signup v-if="page.signup" v-on:close="close"/>
      <v-divider class="mx-4" />
      <v-card-text @click="pageChange(getPageName())">or {{getPageName()}}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </Dialog>
</template>
<script lang="ts">
import { defineComponent, ref, } from 'vue';
import Dialog from '@/components/common/Dialog.vue';
import Signin from '@/components/sign/Signin.vue';
import Signup from '@/components/sign/Signup.vue';

export default defineComponent ({
  components: {
    Dialog,
    Signin,
    Signup,
  },
  setup() {
    const dialog = ref<null | { open: () => null, close: () => null, }>(null);
    const open = () => dialog.value?.open();
    const close = () => dialog.value?.close();
    return { dialog, open, close, };
  },
  data() {
    const page: any = {
      signin: true,
      signup: false,
    };
    return {
      page,
    };
  },
  methods: {
    pageChange (page: string) {
      Object.keys(this.page).forEach(key => {
        if (key === page) this.page[key] = true;
        else this.page[key] = false;
      });
    },
    getPageName () {
      return Object.keys(this.page).find(key => !this.page[key]);
    }
  }
});
</script>

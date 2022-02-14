<template>
  <Dialog ref="dialog">
    <q-card class="q-pa-md">
      <q-card-section>{{msg}}</q-card-section>
      <q-separator spaced/>
      <q-card-actions align="center">
        <q-btn @click="close(true)" label="Yes"/>
        <q-btn @click="close(false)" label="No"/>
      </q-card-actions>
    </q-card>
  </Dialog>
</template>
<script lang="ts">
import { defineComponent, ref, } from 'vue';
import Dialog from '@/components/common/Dialog.vue';

export default defineComponent ({
  components: {
    Dialog,
  },
  props: {
    msg: {
      type: String,
      default: '',
    }
  },
  setup(_, { emit }) {
    const dialog = ref<null | { open: () => null, close: () => null, }>(null);
    const open = () => dialog.value?.open();
    const close = (bool: boolean) => {
      dialog.value?.close();
      if(bool) emit('isYes');
    }
    return { dialog, open, close, };
  },
});
</script>

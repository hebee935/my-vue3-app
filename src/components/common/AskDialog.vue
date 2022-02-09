<template>
  <Dialog ref="dialog">
    <v-card>
      <v-card-text>{{msg}}</v-card-text>
      <v-divider class="mx-4" />
      <v-card-actions class="justify-end">
        <v-btn text @click="close(true)">Yes</v-btn>
        <v-btn text @click="close(false)">No</v-btn>
      </v-card-actions>
    </v-card>
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

<template>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <slot></slot>
  </v-dialog>
</template>
<script>
import { defineComponent, ref, } from 'vue';
export default defineComponent ({
  setup () {
    const dialog = ref(false);
    const open = () => dialog.value = true;
    const close = () => dialog.value = false;
    return { dialog, open, close, };
  },
})
</script>

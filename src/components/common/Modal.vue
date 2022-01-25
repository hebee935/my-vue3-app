<template>
  <teleport to="#teleport-area">
    <div v-show="isOpen" class="modal show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" style="display:block;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <slot></slot>
            <!--<div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button v-on:click="close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>-->
            </div>
        </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue';

export default defineComponent({
  setup() {
    const isOpen = ref(false);

    const open = () => {
        console.log('open!!')
        isOpen.value = true;
    };

    const close = () => {
        isOpen.value = false;
    };

    return {
      isOpen,
      open,
      close,
    }
  }
});
</script>

<style scoped>
</style>
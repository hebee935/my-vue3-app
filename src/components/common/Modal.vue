<template>
  <teleport to="#teleport-area">
    <!-- Modal의 열리고 닫힘을 관리합니다. -->
    <div class="backdrop" v-show="isOpen">
      <span class="close" @click="close">X</span>
      <div class="modal-container">
        <!-- slot을 통해 BaseComponent를 확장시킵니다. -->
        <slot></slot>
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
.backdrop {
  z-index: 999;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(#000000, 0.2);
}
.backdrop .modal-container {
  background: white;
  max-width: 320px;
  width: 100%;
  padding: 1.5rem;
}
</style>
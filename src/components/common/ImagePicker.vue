<template>
  <input type="file" ref="picker" :multiple="multiple" accept="image/*" style="display: none;" @change="changeImage"/>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false,
    }
  },
  setup(_props: any, { emit }: { emit: any }) {
    const images = ref([]);
    const picker = ref<null | { click: () => null }>(null);
    const open = () => {
      picker.value?.click();
    }

    function changeImage(e: any) {
      const files = e.target.files;
      images.value = files;
      emit('changed');
    }

    function getImages() {
      return images.value;
    }

    return {
      images,
      picker,
      open,
      changeImage,
      getImages,
    }
  }
}
</script>

<style>

</style>

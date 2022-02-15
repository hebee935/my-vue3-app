<template>
<q-avatar :size="this.$props.size" style="background-color: #ccc;" text-color="white">
  <img v-if="image" :src="image"/>
  <span v-else>{{user.uid[0].toUpperCase()}}</span>
</q-avatar>
</template>

<script lang="ts">
import store from '@/store';
import { computed, defineComponent, onBeforeMount, ref } from 'vue';

export default defineComponent({
  props: {
    size: {
      type: String,
      default: "40px"
    },
    user: {
      type: Object,
      default: null,
    }
  },
  setup(props) {
    const user = ref(props.user || computed(() => store.getters.getMyInfo));
    const image = ref(null);
    onBeforeMount(async () => {
      if (user.value.avatar) {
        const filedata = await store.dispatch('getFileObject', user.value.avatar);
        updateView(filedata);
      }
    });

    const updateView = (file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        image.value = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    return {
      user,
      image,
      updateView,
    }
  },
})
</script>

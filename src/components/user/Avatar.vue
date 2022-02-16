<template>
<q-avatar :size="this.$props.size" style="background-color: #ccc;" text-color="white">
  <img v-if="image" :src="image"/>
  <span v-else>{{user.uid[0].toUpperCase()}}</span>
</q-avatar>
</template>

<script lang="ts">
import store from '@/store';
import { computed, defineComponent, ref } from 'vue';
import config from '../../../config';

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
    const image = ref(user.value.avatar ? `${config.server.apiV1}/file/${user.value.avatar}/object` : '');

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

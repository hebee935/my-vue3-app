<template>
<q-avatar :size="this.$props.size" style="background-color: #ccc;" text-color="white">
  <img v-if="user.avatar" :src="user.avatar"/>
  <span v-else>{{user.uid[0].toUpperCase()}}</span>
</q-avatar>
</template>

<script lang="ts">
import store from '@/store';
import { computed, defineComponent, ref } from 'vue';

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
    return {
      user,
    }
  },
})
</script>

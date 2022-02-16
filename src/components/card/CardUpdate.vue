<template>
  <CardInput :card="card"/>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed, } from 'vue';
import { useStore } from 'vuex';
import { useRoute, } from 'vue-router';

import CardInput from '@/components/card/CardInput.vue';

export default defineComponent({
  components: {
    CardInput
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const card = ref(computed(() => store.getters.getCardOne));

    onBeforeMount(async () => await store.dispatch('setCardOne', route.params.cardid));
    return {
      card,
    };
  },

});
</script>

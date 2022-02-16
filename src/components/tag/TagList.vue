<template>
  <div class="row">
    <div v-for="tag in tags" :key="tag._id">
      <q-chip square :label="`#${tag.title}`"/>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { computed, defineComponent, onBeforeMount, ref,} from 'vue';
export default defineComponent({
  props: {
    card: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const tags = ref(computed(() => store.getters.getTagList));
    onBeforeMount(async() => await store.dispatch('getTags', { cardid: props.card._id}));

    return {
      tags,
    };
  }
});
</script>

<style>

</style>

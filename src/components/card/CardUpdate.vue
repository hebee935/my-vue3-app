<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="row justify-end">
      <q-btn flat @click="actions.back" icon="clear"/>
    </div>

    <q-form
      @submit="updateCardItem"
    >
      <q-input v-model="card.title" label="Title" :rules="[ val => val && val.length > 0 || 'Please type something']"/>
      <Editor ref="editor" :contents="card.contents"/>
      <div class="row justify-end">
        <q-btn label="Submit" type="submit"/>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed, } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute, } from 'vue-router';
import Editor from '@/components/common/Editor.vue';

export default defineComponent({
  components: {
    Editor,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const card = ref(computed(() => store.getters.getCardOne));

    onBeforeMount(async () => {
      await store.dispatch('setCardOne', route.params.cardid);
    });

    const editor = ref<null | { getValue: () => string }>(null);

    async function updateCardItem() {
      card.value.contents = editor.value?.getValue() || '';
      await store.dispatch('updateCard', card.value);
      router.push('/card/' + route.params.cardid);
    }

    const actions = {
      back: () => router.push('/card'),
    };

    return {
      card,
      editor,
      updateCardItem,
      actions,
    };
  },

});
</script>

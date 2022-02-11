<template>
  <v-card flat>
    <v-card-header class="justify-end">
      <v-btn @click="this.$router.push('/card')"><v-icon>mdi-close</v-icon></v-btn>
    </v-card-header>
    <v-card-text>
      <v-form>
        <v-text-field label="Title" v-model="state.card.title"/>
        <!-- <v-file-input multiple label="Files"></v-file-input> -->
        <Tiptap ref="editor" :contents="state.card.contents"/>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn class="justify-end" @click="updateCardItem">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute, } from 'vue-router';
import Tiptap from '@/components/tiptap/Editor.vue';

export default defineComponent({
  components: {
    Tiptap,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const state = ref<any>({
      card: {},
      loading: true,
    });

    onBeforeMount(async () => {
      await store.dispatch('setCardOne', route.params.cardid);
      state.value.card = store.getters.getCardOne;
    });

    const editor = ref<null | { getHTML: () => string }>(null);

    async function updateCardItem() {
      const contents = editor.value?.getHTML() || '';
      state.value.card.contents = contents;
      await store.dispatch('updateCard', state.value.card);
      router.push('/card/' + route.params.cardid);
    }
    return {
      state,
      editor,
      updateCardItem,
    };
  },

});
</script>

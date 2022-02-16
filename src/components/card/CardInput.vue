<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="row justify-end">
      <q-btn flat @click="actions.back" icon="clear"/>
    </div>

    <q-form @submit="upsertCardItem">
      <q-input v-model="card.title" label="Title" :rules="[ val => val && val.length > 0 || 'Please type something']"/>
      <Editor ref="editor" :contents="card.contents"/>
      <TagInput ref="tags" :card="isNew ? null : card"/>
      <div class="row justify-end">
        <q-btn :label="isNew ? 'Create' : 'Save'" type="submit"/>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import Editor from '@/components/common/Editor.vue';
import TagInput from '@/components/tag/TagInput.vue';

export default defineComponent({
  components: {
    Editor,
    TagInput,
  },
  props: {
    card: {
      type: Object,
      default: null,
    }
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const isNew = !props.card;

    const card = ref<any>(props.card || { title: '', contents: '' });

    const editor = ref<null | { getValue: () => string }>(null);
    const tags = ref<null | { getTags: () => any, getDeletedTags: () => any }>(null);

    async function upsertCardItem() {
      card.value.contents = editor.value?.getValue() || '';
      const upsertcard = isNew ? await store.dispatch('addCard', card.value) : await store.dispatch('updateCard', card.value);
      const newTags = tags.value?.getTags();
      for (let i = 0; i < newTags.length; i++) {
        await store.dispatch('addTag', { title: newTags[i].title, card: upsertcard._id });
      }
      const deletedTags = tags.value?.getDeletedTags();
      for (let i = 0; i < deletedTags.length; i++) {

        await store.dispatch('deleteTag', deletedTags[i]._id);
      }
      router.push('/card/' + upsertcard._id);
    }

    const actions = {
      back: () => router.push('/card'),
    };

    return {
      card,
      isNew,
      editor,
      upsertCardItem,
      actions,
      tags,
    };
  },

});
</script>

<style scoped>
</style>

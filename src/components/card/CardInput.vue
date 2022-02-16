<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="row justify-end">
      <q-btn flat @click="actions.back" icon="clear"/>
    </div>

    <q-form
      @submit="addCardItem"
    >
      <q-input v-model="title" label="Title" :rules="[ val => val && val.length > 0 || 'Please type something']"/>
      <Editor ref="editor"/>
      <div class="row justify-end">
        <q-btn label="Create" type="submit"/>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Editor from '@/components/common/Editor.vue';

export default defineComponent({
  components: {
    Editor,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const title = ref('');
    const editor = ref<null | { getValue: () => string }>(null);

    async function addCardItem() {
      const contents = editor.value?.getValue() || '';
      const newcard = await store.dispatch('addCard', { title: title.value, contents, });
      router.push('/card/' + newcard._id);
    }

    const actions = {
      back: () => router.push('/card'),
    };

    return {
      title,
      editor,
      addCardItem,
      actions,
    };
  },

});
</script>

<style scoped>
.full-height {
  height:100%
}
</style>

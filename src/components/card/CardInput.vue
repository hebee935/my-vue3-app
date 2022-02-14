<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="row justify-end">
      <q-btn flat @click="actions.back" icon="clear"/>
    </div>

    <q-form
      @submit="addCardItem"
    >
      <q-input v-model="title" label="Title" :rules="[ val => val && val.length > 0 || 'Please type something']"/>
      <Editor :ref="editor"/>
      <div class="row justify-end">
        <q-btn label="Create" type="submit"/>
      </div>
    </q-form>
  </div>
  <!-- <v-card flat class="full-height">
    <v-card-header class="justify-end">
      <v-btn @click="this.$router.push('/card')"><v-icon>mdi-close</v-icon></v-btn>
    </v-card-header>
    <v-card-text>
      <v-form>
        <v-text-field label="Title" v-model="title"/>
        <v-file-input multiple label="Files"></v-file-input>
        <Tiptap ref="editor" :contents="contents"/>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn class="justify-end" @click="addCardItem">Create</v-btn>
    </v-card-actions>
  </v-card> -->
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
    const editor = ref<null | { getHTML: () => string }>(null);

    async function addCardItem() {
      const contents = editor.value?.getHTML() || '';
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

<template>
  <div>
    <v-text-field v-model="title" @keyup.enter="addTodoItem" full-width/>
  </div>
</template>

<script lang="ts">
import {useStore} from 'vuex';
import { defineComponent, ref, } from 'vue';

export default defineComponent({
  setup() {
    const store = useStore();
    const title = ref('');

    const clearInput = () => title.value = '';
    async function addTodoItem() {
      if(title.value.length) {
        await store.dispatch('addTodo', { title: title.value });
        clearInput();
      }
    }

    return {
      title,
      addTodoItem,
    }
  },
});

</script>

<style scoped>

</style>

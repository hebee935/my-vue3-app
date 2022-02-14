<template>
  <div>
    <q-input bottom-slots v-model="title" label="Todo" @keyup.enter="addTodoItem" autofocus @blur="this.$emit('blur')">
      <template v-slot:append>
        <q-btn round dense flat icon="add" @click="this.$props.todo ? updateTodoItem : addTodoItem"/>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import {useStore} from 'vuex';
import { defineComponent, ref, } from 'vue';

export default defineComponent({
  props: {
    todo: {
      type: Object,
      default: null,
    }
  },
  setup(props) {
    const store = useStore();
    const title = ref(props.todo?.title || '');

    const clearInput = () => title.value = '';
    async function addTodoItem() {
      if(title.value.length) {
        await store.dispatch('addTodo', { title: title.value });
        clearInput();
      }
    }
    async function updateTodoItem() {
      if(title.value.length) {
        await store.dispatch('updateTodo', { _id: props.todo._id, title: title.value });
        clearInput();
      }
    }

    return {
      title,
      addTodoItem,
      updateTodoItem,
    }
  },
});

</script>

<style scoped>

</style>

<template>
  <div class="q-ma-lg">
    <TodoInput/>
  </div>
  <div class="row justify-around">
    <q-list v-for="(s, index) in status" :key="index">
      <div class="col">
        <q-item-label header>{{s}}</q-item-label>
        <draggable :list="todos[s]" group="todos" :class="s" @end="updateTodo">
          <q-item v-for="todo in todos[s]" :key="todo._id" :id="todo._id">
            <q-item-section v-if="edit===todo._id">
              <TodoInput :todo="todo" @blur="clearEdit()"/>
            </q-item-section>
            <q-item-section v-else @click="editTodo(todo._id)">
              <q-item-label>{{ todo.title }}</q-item-label>
              <q-item-label caption>{{getDate(todo.updatedAt)}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon size="medium" name="clear" @click="removeTodoItem(todo._id)"/>
            </q-item-section>
          </q-item>
        </draggable>
      </div>
    </q-list>
  </div>
</template>

<script lang="ts">
import { ITodo } from '@/interfaces/todo';
import { computed, defineComponent, onBeforeMount, ref, } from 'vue';
import { useStore } from 'vuex';
import { VueDraggableNext } from 'vue-draggable-next';

import TodoInput from '@/components/todo/TodoInput.vue';
import { getDate } from '@/lib/utils';

export default defineComponent({
  components: {
    TodoInput,
    draggable: VueDraggableNext,
  },
  setup() {
    const store = useStore();
    onBeforeMount(async () => await store.dispatch('getTodos'));

    const todos = computed(() => {
      return store.getters.getTodoList.reduce((acc: any, curr: ITodo) => {
        acc[curr.status].push(curr);
        return acc;
      }, { READY: [], PROGRESS: [], DONE: [] });
    });

    const edit = ref('');
    function editTodo(todoid: string) {
      edit.value = todoid;
    }
    function clearEdit() {
      edit.value = '';
    }

    async function removeTodoItem(todoid: string) {
      await store.dispatch('deleteTodo', todoid);
    }

    async function updateTodo(event:any) {
      const { to, item } = event;
      await store.dispatch('updateTodo', { _id: item.id, status: to.className });
    }

    return {
      status: ['READY', 'PROGRESS', 'DONE'],
      todos,
      edit,
      editTodo,
      clearEdit,

      updateTodo,
      removeTodoItem,
      getDate,
    };
  },
});

</script>

<style scoped>

</style>

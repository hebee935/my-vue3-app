<template>
	<v-card flat>
    <v-card-header class="justify-end">
      <v-card-header-text class="headline">Add Task</v-card-header-text>
    </v-card-header>
    <v-card-text>
      <TodoInput/>
      <v-list two-line flat>
        <v-list-subheader>READY</v-list-subheader>
        <draggable :list="todos.READY" group="todos" class="READY" @end="updateTodo">
          <v-list-item v-for="todo in todos.READY" :key="todo._id" :id="todo._id">
            <v-list-item-header>
              <v-list-item-title>{{ todo.title }}</v-list-item-title>
              <v-list-item-subtitle>Added on: {{getDate(todo.createdAt)}}</v-list-item-subtitle>
            </v-list-item-header>
            <v-btn fab small @click="removeTodoItem(todo._id)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item>
        </draggable>
      </v-list>
      <v-divider/>
      <v-list two-line flat>
        <v-list-subheader>PROGRESS</v-list-subheader>
        <draggable :list="todos.PROGRESS" @end="updateTodo" group="todos" class="PROGRESS">
          <v-list-item v-for="todo in todos.PROGRESS" :key="todo._id" :id="todo._id">
            <v-list-item-header>
              <v-list-item-title>{{ todo.title }}</v-list-item-title>
              <v-list-item-subtitle>Added on: {{getDate(todo.createdAt)}}</v-list-item-subtitle>
            </v-list-item-header>
            <v-btn fab small @click="removeTodoItem(todo._id)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item>
        </draggable>
      </v-list>
      <v-divider/>
      <v-list two-line flat>
        <v-list-subheader>DONE</v-list-subheader>
        <draggable :list="todos.DONE" @end="updateTodo" group="todos" class="DONE">
          <v-list-item v-for="todo in todos.DONE" :key="todo._id" :id="todo._id">
            <v-list-item-header>
              <v-list-item-title>{{ todo.title }}</v-list-item-title>
              <v-list-item-subtitle>Added on: {{getDate(todo.createdAt)}}</v-list-item-subtitle>
            </v-list-item-header>
            <v-btn fab small @click="removeTodoItem(todo._id)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item>
        </draggable>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { ITodo } from '@/interfaces/todo';
import { computed, defineComponent, onBeforeMount, } from 'vue';
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

    async function removeTodoItem(todoid: string) {
      await store.dispatch('deleteTodo', todoid);
    }

    async function updateTodo(event:any) {
      const { to, item } = event;
      await store.dispatch('updateTodo', { _id: item.id, status: to.className });
    }

    return {
      todos,

      updateTodo,
      removeTodoItem,
      getDate,
    };
  },
});

</script>

<style scoped>

</style>

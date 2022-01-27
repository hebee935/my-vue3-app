<template>
	<div>
		<h2>TODO List</h2>
        <TodoInput/>

        <section>
            <b-list-group>
                <b-list-group-item v-for="todoItem in todoList" :key="todoItem._id">
                    {{ todoItem.text }}
                    <b-button v-on:click="removeTodoItem(todoItem._id)">X</b-button>
                </b-list-group-item>
                <br>
            </b-list-group>
        </section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoInput from './TodoInput.vue';

export default defineComponent({
    components: {
        'TodoInput': TodoInput
    },

    created() {
        this.$store.dispatch('getTodos');
    },

    computed: {
        todoList() {
            return this.$store.getters.getTodoList;
        },
    },

    methods: {
        removeTodoItem(id:string):void {
            this.$store.dispatch('deleteTodo', id);
        },
    },
});

</script>

<style scoped>

</style>

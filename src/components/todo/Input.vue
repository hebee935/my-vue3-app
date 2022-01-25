<template>
    <div>
        <input type="text" v-model="text">
        <b-button v-on:click="addTodoItem">+</b-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            text: '',
        }
    },

    methods: {
        addTodoItem():void {
            if (this.text.length) {
                this.$store.dispatch('addTodo', { text: this.text });
                this.clearInput();
            }
        },
        clearInput():void {
            this.text = '';
        },
    }
});

</script>

<style scoped>

</style>
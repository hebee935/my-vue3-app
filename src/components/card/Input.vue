<template>
    <div>
        <b-form>
            <div>
                <b-form-textarea v-model="title" placeholder="Title"/>
            </div>
            <div>
                <b-form-textarea v-model="contents" placeholder="Contents"/>
            </div>
            <div>
                <b-button v-on:click="addCardItem">Add</b-button>
            </div>
        </b-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            title: '',
            contents: ''
        }
    },

    methods: {
        addCardItem():void {
            this.$store.dispatch('addCard', { title: this.title, contents: this.contents });
            this.$router.push('/card');
        },
    }
    
});
</script>
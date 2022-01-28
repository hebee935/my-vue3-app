<template>
  <v-form>
    <v-textarea label="Comment" v-model="contents" rows="2"/>
    <v-btn @click="addCommentItem" text>Add</v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            contents: ''
        }
    },
    methods: {
        async addCommentItem() {
            // const card = await this.$store.dispatch('addCard', { contents: this.contents });
            // console.log(card);
        },
    }

});
</script>

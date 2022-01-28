<template>
  <v-card flat>
    <v-card-header class="justify-end">
      <v-btn @click="this.$router.go(-1)"><v-icon>mdi-close</v-icon></v-btn>
    </v-card-header>
    <v-card-text>
      <v-form>
        <v-text-field label="Title" v-model="title"/>
        <v-textarea label="Contents" v-model="contents" auto-grow/>
        <v-file-input multiple label="Files"></v-file-input>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn class="justify-end" @click="addCardItem">Create</v-btn>
    </v-card-actions>
  </v-card>
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
        async addCardItem() {
            const card = await this.$store.dispatch('addCard', { title: this.title, contents: this.contents });
            console.log(card);
            this.$router.push('/card/' + card._id);
        },
    }

});
</script>

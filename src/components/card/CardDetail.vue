<template>
  <v-card
    :loading="loading"
    flat
  >

    <v-img
      height="500"
      v-show="card.image"
      :src="card.image"
    ></v-img>
    <v-card-header class="justify-end">
      <v-btn text @click="this.$router.go(-1)" ><v-icon>mdi-close</v-icon></v-btn>
    </v-card-header>
    <v-card-title>{{card.title}}</v-card-title>
    <v-card-subtitle>
      <div class="my-4 text-subtitle-1">{{user.nickname}} | {{getDate(card.createdAt)}}</div>
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>


    <v-card-text>
      <div class="text-subtitle-1">{{card.contents}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-col sm="12">
        <CommentInput />
      </v-col>
    </v-card-actions>
    <v-card-text>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';
import moment from 'moment';

import CommentInput from '@/components/comment/CommentInput.vue';

export default defineComponent({
  components: {
    CommentInput,
  },
  created() {
    this.$store.dispatch('setCardOne', this.$route.params.cardid).then(() => {
      this.$store.dispatch('setUserOne', this.card.user);
    });
  },
  data() {
    return {
      card: this.$store.getters.getCardOne,
      user: this.$store.getters.getUserOne,
    };
  },
  methods: {
    getDate(date: Date) {
      return moment(date).format('YYYY.MM.DD');
    }
  },
});
</script>

<style scoped>
</style>

<template>
  <v-card
    flat
  >
    <v-img
      height="500"
      v-show="card.image"
      :src="card.image"
    ></v-img>
    <v-card-header class="justify-end">
      <v-btn v-if="isMyItem" @click="updateCard" ><v-icon>mdi-wrench</v-icon></v-btn>
      <v-btn v-if="isMyItem" @click="open" ><v-icon>mdi-delete</v-icon></v-btn>
      <v-btn @click="this.$router.push('/card')" ><v-icon>mdi-close</v-icon></v-btn>
    </v-card-header>
    <v-card-title>{{card.title}}</v-card-title>
    <v-card-subtitle>
      <div class="my-4 text-subtitle-1">{{card.user.nickname}} | {{getDate(card.createdAt)}}</div>
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>

    <v-card-text class="pb-10">
      <div class="text-subtitle-1" v-html="card.contents" />
    </v-card-text>
    <v-divider class="mx-4 pb-5"></v-divider>
    <v-card-actions>
      <v-col sm="12">
        <div class="pb-5"><CommentInput :card="this.$route.params.cardid" /></div>
        <div><CommentList :card="card"/></div>
      </v-col>
    </v-card-actions>
  </v-card>
  <AskDialog ref="deleteDialog" msg="해당 카드를 삭제하시겠습니까?" @isYes="deleteCard"/>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref, } from 'vue';
import { useRoute, useRouter, } from 'vue-router';
import moment from 'moment';
import { useStore } from 'vuex';

import CommentInput from '@/components/comment/CommentInput.vue';
import CommentList from '@/components/comment/CommentList.vue';
import AskDialog from '@/components/common/AskDialog.vue';

export default defineComponent({
  components: {
    CommentInput,
    CommentList,
    AskDialog,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const card = computed(() => store.getters.getCardOne);
    const deleteDialog = ref<null | { open: () => null, close: () => null, }>(null);
    const open = () => deleteDialog.value?.open();

    const isMyItem = computed(() => {
      const me = store.getters.getMyInfo;
      return me?._id === card.value.user._id;
    });

    onBeforeMount(async () => {
      await store.dispatch('setCardOne', route.params.cardid);
    });

    const deleteCard = async () => {
      await store.dispatch('deleteCard', route.params.cardid);
      router.push('/card');
    };
    const updateCard = () => {
      router.push(`/card/${route.params.cardid}/update`);
    };
    const getDate = (date: Date) => moment(date).format('YYYY.MM.DD');
    return {
      card,
      isMyItem,
      deleteCard,
      updateCard,
      getDate,

      deleteDialog,
      open,
    };
  },
  beforeUpdate() {
    console.log('beforeUpdate', this.$store.getters.getMyInfo);

  },
  updated() {
    console.log('updated', this.$store.getters.getMyInfo);
  },
});
</script>

<style scoped>
</style>

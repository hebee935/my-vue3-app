<template>
  <v-card
    :loading="state.loading"
    flat
  >
    <v-img
      height="500"
      v-show="state.card.image"
      :src="state.card.image"
    ></v-img>
    <v-card-header class="justify-end">
      <v-btn v-if="isMyItem" @click="updateCard" ><v-icon>mdi-wrench</v-icon></v-btn>
      <v-btn v-if="isMyItem" @click="open" ><v-icon>mdi-delete</v-icon></v-btn>
      <v-btn @click="this.$router.push('/card')" ><v-icon>mdi-close</v-icon></v-btn>
    </v-card-header>
    <v-card-title>{{state.card.title}}</v-card-title>
    <v-card-subtitle>
      <div class="my-4 text-subtitle-1">{{state.user?.nickname}} | {{getDate(state.card.createdAt)}}</div>
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <div class="text-subtitle-1" v-html="state.card.contents" />
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
  <AskDialog ref="deleteDialog" msg="해당 카드를 삭제하시겠습니까?" @isYes="deleteCard"/>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, } from 'vue';
import { useRoute, useRouter, } from 'vue-router';
import moment from 'moment';
import { useStore } from 'vuex';

import CommentInput from '@/components/comment/CommentInput.vue';
import AskDialog from '@/components/common/AskDialog.vue';

export default defineComponent({
  components: {
    CommentInput,
    AskDialog,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const state = ref<any>({
      card: {},
      user: {},
      loading: true,
    });
    const deleteDialog = ref<null | { open: () => null, close: () => null, }>(null);
    const open = () => deleteDialog.value?.open();

    const isMyItem = computed(() => {
      const me = store.getters.getMyInfo;
      return true;
      // return me?._id === state.value.user?._id;
    });

    onMounted(async () => {
      await store.dispatch('setCardOne', route.params.cardid);
      state.value.card = store.getters.getCardOne;
      await store.dispatch('setUserOne', state.value.card.user);
      state.value.user = store.getters.getUserOne;
      state.value.loading = false;
    });

    const deleteCard = async () => {
      await store.dispatch('deleteCard', state.value.card._id);
      router.push('/card');
    };
    const updateCard = () => {
      router.push(`/card/${route.params.cardid}/update`);
    };
    const getDate = (date: Date) => moment(date).format('YYYY.MM.DD');
    return {
      state,
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

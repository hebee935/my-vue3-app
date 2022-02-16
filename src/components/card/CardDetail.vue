<template>
  <div class="q-pa-md q-gutter-sm">
    <q-card flat>
      <q-card-section>
        <div class="row">
          <div class="col-auto">
            <div class="text-h5">{{card.title}}</div>
            <div class="row q-pt-md">
              <Avatar :user="card.user"/>
              <div class="col q-pl-md">
                <div class="text-subtitle2">{{card.user.nickname}}</div>
                <div class="text-subtitle2">{{getDate(card.updatedAt)}}</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="row justify-end">
              <q-btn flat v-if="isMyItem" @click="actions.update" icon="edit"/>
              <q-btn flat v-if="isMyItem" @click="open" icon="delete"/>
              <q-btn flat @click="actions.back" icon="clear"/>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section v-html="card.contents"/>
      <q-card-section>
        <TagList :card="card"/>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <CommentList :card="card"/>
      </q-card-actions>
    </q-card>
  </div>
  <AskDialog ref="deleteDialog" msg="해당 카드를 삭제하시겠습니까?" @isYes="actions.delete"/>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, } from 'vue';
import { useRoute, useRouter, } from 'vue-router';
import { useStore } from 'vuex';

import CommentList from '@/components/comment/CommentList.vue';
import AskDialog from '@/components/common/AskDialog.vue';
import Avatar from '@/components/user/Avatar.vue';
import TagList from '@/components/tag/TagList.vue';

import { getDate } from '@/lib/utils';

export default defineComponent({
  components: {
    CommentList,
    AskDialog,
    Avatar,
    TagList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onBeforeMount(async () => await store.dispatch('setCardOne', route.params.cardid));

    const card = computed(() => store.getters.getCardOne);
    const deleteDialog = ref<null | { open: () => null, close: () => null, }>(null);
    const open = () => deleteDialog.value?.open();

    const me = computed(() => store.getters.getMyInfo);
    const isMyItem = computed(() => {
      return me.value?._id === card.value.user._id;
    });

    const actions = {
      back: () => router.push('/card'),
      update: () => router.push(`/card/${route.params.cardid}/update`),
      delete: async () => {
        await store.dispatch('deleteCard', route.params.cardid);
        router.push('/card');
      },
    };
    return {
      card,
      isMyItem,
      getDate,

      deleteDialog,
      open,

      actions,
    };
  },
});
</script>

<style scoped>
</style>

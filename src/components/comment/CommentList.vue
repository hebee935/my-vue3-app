<template>
  <v-card flat v-for="parent in comments.parents" :key="parent._id">
    <v-card-text>
      <v-table>
        <th class="text-left">
          <p>{{ parent.user.nickname }}</p>
          <p v-show="isWriter(parent.user._id)" class="writer">작성자</p>
        </th>
        <tr>{{ parent.message }}</tr>
        <tr>
          <p>{{ getDate(parent.createdAt) }}</p>
          <v-divider vertical class="mx-1"/>
          <v-btn @click="replyComment(parent._id)">
            <font-awesome-icon icon="reply"/>
          </v-btn>
        </tr>
      </v-table>
      <v-divider/>
      <div v-if="reply === parent._id">
        <CommentInput :card="this.$props.card._id" :parent="parent._id" @success="close"/>
      </div>
      <v-card flat v-for="child in myChild(parent._id)" :key="child._id" class="pt-4">
        <v-table class="pl-6">
          <th class="text-left">
            <p>{{ child.user.nickname }}</p>
            <p v-show="isWriter(child.user._id)" class="writer">작성자</p>
          </th>
          <tr>{{ child.message }}</tr>
          <tr>
            <p>{{ getDate(child.createdAt) }}</p>
            <v-divider vertical class="mx-1"/>
          </tr>
        </v-table>
        <v-divider/>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';

import CommentInput from '@/components/comment/CommentInput.vue';
import { IComment } from '@/interfaces/comment';

export default defineComponent({
  components: {
    CommentInput,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    onBeforeMount(async () => await store.dispatch('setComments', props.card._id));
    const comments = computed(() => {
      const comments = store.getters.getCommentList;
      return comments.reduce((acc: any, curr: IComment) => {
        if (curr.parent) acc.childs.push(curr);
        else acc.parents.push(curr);
        return acc;
      }, { parents: [], childs: [] });
    });
    const myChild = (parentid: string) => comments.value.childs.filter((child: IComment) => child.parent === parentid);

    const reply = ref('');
    const replyComment = (parentid: string) => {
      if (reply.value === parentid) close();
      else reply.value = parentid;
    };
    const close = () => reply.value = '';

    const getDate = (date: Date) => moment(date).format('YYYY.MM.DD');
    const isWriter = (userid: string) => userid === props.card.user._id;

    return {
      comments,
      myChild,
      isWriter,
      getDate,
      replyComment,
      reply,
      close,
    }
  },
});
</script>

<style scoped>
p{
  display: inline-block;
}
.writer{
  border: 1px solid #fa2828;
  border-radius: 0.75rem;
  margin-left: 0.25rem;
  padding: 0.2rem;
  font-size: smaller;
  color: #fa2828;
}
</style>

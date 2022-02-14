<template>
  <div>
    <CommentInput :card="this.$props.card._id"/>
  </div>
  <q-separator inset spaced/>
  <div>
    <q-list v-for="parent in comments.parents" :key="parent._id">
      <q-item>
        <q-item-section top avatar>
          <Avatar :user="parent.user" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{parent.user.nickname}}</span>
            <span v-show="isWriter(parent.user._id)" class="text-grey-8"> 작성자</span>
          </q-item-label>
          <q-item-label>{{parent.message}}</q-item-label>
          <div class="row">
            <q-item-label caption>{{getDate(parent.createdAt)}}</q-item-label>
            <q-separator vertical spaced color="white"/>
            <q-icon name="reply" @click="replyComment(parent._id)"/>
          </div>
        </q-item-section>
        <q-item-section side top>
        </q-item-section>
      </q-item>
      <q-separator inset spaced/>
      <div v-if="reply === parent._id" class="q-ml-lg" >
        <CommentInput :card="this.$props.card._id" :parent="parent._id" @success="close"/>
        <q-separator inset spaced/>
      </div>
      <q-list v-for="child in myChild(parent._id)" :key="child._id" class="q-ml-lg">
        <q-item>
          <q-item-section top avatar>
            <Avatar :user="child.user" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{child.user.nickname}}</span>
              <span v-show="isWriter(child.user._id)" class="text-grey-8"> 작성자</span>
            </q-item-label>
            <q-item-label>{{child.message}}</q-item-label>
            <div class="row">
              <q-item-label caption>{{getDate(child.createdAt)}}</q-item-label>
              <q-separator vertical spaced color="white"/>
              <q-icon name="reply" @click="replyComment(parent._id)"/>
            </div>
          </q-item-section>
          <q-item-section side top>
          </q-item-section>
        </q-item>
        <q-separator inset spaced/>
      </q-list>
    </q-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, } from 'vue';
import { useStore } from 'vuex';

import CommentInput from '@/components/comment/CommentInput.vue';
import Avatar from '@/components/user/Avatar.vue';
import { IComment } from '@/interfaces/comment';

import { getDate } from '@/lib/utils';

export default defineComponent({
  components: {
    CommentInput,
    Avatar,
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

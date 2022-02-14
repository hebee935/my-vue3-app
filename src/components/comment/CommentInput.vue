<template>
  <div class="q-pa-md">
    <q-input outlined v-model="comment.message" autogrow>
      <template v-slot:before>
        <div class="col">
          <Avatar />
          <div class="text-overline text-center">{{me.nickname}}</div>
        </div>
      </template>
      <template v-slot:after>
        <q-btn flat icon="send" @click="addCommentItem">
        </q-btn>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, } from 'vue';
import { useStore } from 'vuex';

import Avatar from '@/components/user/Avatar.vue';

export default defineComponent({
  props: {
    card: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      default: null,
    }
  },
  components: {
    Avatar,
  },
  setup(props, { emit }) {
    const store = useStore();

    const comment = ref({
      message: '',
      parent: props.parent,
      card: props.card,
    });

    async function addCommentItem() {
      await store.dispatch('addComment', comment.value);
      comment.value.message = '';
      emit('success');
    }
    const me = computed(() => store.getters.getMyInfo);

    return {
      me,
      comment,
      addCommentItem,
    }
  }

});
</script>

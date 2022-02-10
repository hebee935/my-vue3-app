<template>
  <v-card flat variant="outlined" class="mx-auto">
    <v-card-text>
    <p class="font-weight-bold">{{me.nickname}}</p>
    <v-textarea v-model="comment.message" rows="1" auto-grow/>
    <v-btn @click="addCommentItem" text>Add</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref, } from 'vue';
import { useStore } from 'vuex';

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
  setup(props) {
    const store = useStore();

    const comment = ref({
      message: '',
      parent: props.parent,
      card: props.card,
    });

    async function addCommentItem() {
      await store.dispatch('addComment', comment.value);
      comment.value.message = '';
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

<template>
  <v-card flat v-for="comment in comments" :key="comment._id">
    <v-card-text>
      <v-table>
        <th class="text-left">{{ comment.user.nickname }}</th>
        <tr>{{ comment.message }}</tr>
        <tr>
          <p>{{ getDate(comment.createdAt) }}</p>
          <v-divider vertical class="mx-1"/>
          <button>
            <font-awesome-icon icon="reply"/>
          </button>
        </tr>
      </v-table>
      <v-divider/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';

export default defineComponent({
  props: {
    card: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    onMounted(async () => await store.dispatch('setComments', props.card));
    const comments = computed(() => store.getters.getCommentList);
    const getDate = (date: Date) => moment(date).format('YYYY.MM.DD');

    return {
      comments,
      getDate,
    }
  },
});
</script>

<style scoped>
p{
  display: inline-block;
}
</style>

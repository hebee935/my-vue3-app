<template>
  <v-card flat>
    <v-card-header>
      <v-card-header-text></v-card-header-text>
      <v-btn v-if="getMyInfo" @click="this.$router.push('/card/create')">Create</v-btn>
    </v-card-header>
    <v-card-text>
      <v-table >
        <template v-slot:default>
          <tbody>
            <tr
              v-for="card in cardList"
              :key="card._id"
              @click="getDetailView(card._id)"
            >
              <td class="text-subtitle-1">{{ card.title }}</td>
              <td>{{ card.createdAt }}</td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ICard } from '../../interfaces/card';
import { timeForToday } from '../../lib/utils';

export default defineComponent({
  created() {
    this.$store.dispatch('setCards');
  },
  data() {
    return {
      fields: ['title', 'createdAt'],
    }
  },
  computed: {
    cardList() {
        const cards = this.$store.getters.getCardList;
        return cards.map((card: ICard) => {
            const contents = card.contents?.slice(0, 50);
            return {
                _id: card._id,
                title: card.title,
                image: card.image,
                createdAt: card.createdAt,
                contents: contents && contents.length >= 50 ? contents + '...' : contents,
            };
        });
    },
    getMyInfo() {
      return this.$store.getters.getMyInfo;
    }
  },
  methods: {
    timeForToday,
    getDetailView(cardid: string) {
      this.$router.push(`/card/${cardid}`);
    },
  },

});
</script>

<style scoped>

</style>

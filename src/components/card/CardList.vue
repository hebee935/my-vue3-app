<template>
	<v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="card in cardList"
          :key="card._id"
        >
          <td>{{ card.title }}</td>
          <td>{{ card.createdAt }}</td>
        </tr>
      </tbody>
    </template>
  </v-table>
  <!-- <v-card
    class="mx-auto"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cardList"
          :key="card._id"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"/>
              <v-card-text v-text="card.contents"/>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ICard } from '../../interfaces/card';
import { timeForToday } from '../../lib/utils';

export default defineComponent({
    created() {
        this.$store.dispatch('getCards');
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
    },

});
</script>

<style scoped>

</style>

<template>
	<div>
		<h2>Card List</h2>
        <div v-if="getMyInfo">
            <button class="btn btn-outline-dark" v-on:click="this.$router.push('/card/create')">Add</button>
        </div>
        <section>
            <div class="card-group" v-for="card in cardList" :key="card._id">
                <div class="col">
                    <div class="card" v-on:click="this.$router.push('/card/'+card._id)">
                        <img :src=card.image class="card-img-top"/>
                        <div class="card-body">
                            <h5 class="card-title">{{card.title}}</h5>
                            <p class="card-text">{{card.contents}}</p>
                            <p class="card-text"><small class="text-muted">{{timeForToday(card.createdAt)}}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	</div>
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
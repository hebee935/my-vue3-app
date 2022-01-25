<template>
	<div>
		<h2>Card List</h2>
        <div v-if="getMyInfo">
            <b-button variant="outline-dark" v-on:click="this.$router.push('/card/create')">Add</b-button>
        </div>

        <section>
            <b-card-group deck v-for="card in cardList" :key="card._id">
                <b-card
                    :title=card.title
                    :img-src=card.image
                    img-top>
                    <b-card-text>{{card.contents}}</b-card-text>
                </b-card>
            </b-card-group>
            <!-- <b-table striped hover :items="cardList" :fields="fields"></b-table> -->
        </section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
            return this.$store.getters.getCardList;
        },
        getMyInfo() {
			return this.$store.getters.getMyInfo;
		}
    },

});
</script>

<style scoped>

</style>
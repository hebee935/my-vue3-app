<template>
	<div class="card">
        <img :src=card.image class="card-img-top">
        <div class="card-body">
            <button @click="this.$router.go(-1)" type="button" class="btn-close" aria-label="Close"></button>
            <h5 class="card-title">{{card.title}}</h5>
            <p class="card-text">{{card.contents}}</p>
            <div class="card-footer text-muted">
                {{timeForToday(card.createdAt)}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import { ICard } from '../../interfaces/card';
import { timeForToday } from '../../lib/utils';

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRoute();
        const cardid = router.params.cardid;
        const card = store.state.CardModule.list.find((list:ICard) => list._id === cardid);

        return {
            card,
            timeForToday,
        };
    },
});
</script>

<style scoped>
</style>
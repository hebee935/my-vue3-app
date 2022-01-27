<template>
    <div>
        <form>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="title" v-model="title" placeholder="Title" required>
                <label for="title">Title</label>
            </div>
            <div class="mb-3">
                <input class="form-control" type="file" id="formFileMultiple" multiple>
            </div>
            <div class="form-floating mb-3">
                <textarea class="form-control" id="contents" rows="5" v-model="contents" placeholder="Contents"></textarea>
                <label for="contents">Contents</label>
            </div>
            <button v-on:click="addCardItem" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            title: '',
            contents: ''
        }
    },

    methods: {
        async addCardItem() {
            const card = await this.$store.dispatch('addCard', { title: this.title, contents: this.contents });
            console.log(card);
            this.$router.push('/card/' + card._id);
        },
    }

});
</script>
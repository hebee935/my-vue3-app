<template>
	<div>
        <b-calendar v-model="value" @context="onContext" block locale="en-US"></b-calendar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { } from 'bootstrap-vue-3';

export default defineComponent({
    data() {
        return {
            value: '',
            context: null,
        }
    },
    methods: {
        onContext(ctx: any) {
            this.context = ctx
        }
    }
});
</script>

<style scoped>

</style>
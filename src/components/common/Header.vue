<template>
	<header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand"><router-link to="/">MyVue3App</router-link></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link"><router-link to="/card">Card</router-link></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"><router-link to="/todo">Todo</router-link></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"><router-link to="/schedule">Schedule</router-link></a>
                </li>
            </ul>
            <div class="d-flex">
                <div v-if="getMyInfo">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{getMyInfo?.nickname}}님
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" @click="signout">SignOut</a></li>
                        </ul>
                    </li>
                </div>
                <div v-else>
                    <button class="btn btn-outline-dark" @click="open">SignIn</button>
                </div>
            </div>
            </div>
        </div>
        </nav>

		<SignModal ref="signModal" />
	</header>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue';
import SignModal from '@/components/sign/SignModal.vue';

export default defineComponent({
	components: {
		SignModal,
	},
	computed: {
        getMyInfo() {
			return this.$store.getters.getMyInfo;
		}
    },
	methods: {
		signout() {
			this.$store.commit('SIGNOUT');
		}
	},
	setup() {
		const signModal = ref<null | { open: () => null }>(null);
		const open = () => signModal.value?.open();

		return {
			signModal,
			open,
		};
	}
});
</script>

<style scoped>
a{text-decoration:none; color:#333;}
</style>

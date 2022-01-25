<template>
	<header>
		<h1><router-link to="/" class="logo"><img alt="Vue logo" src="../../assets/logo.png" width="80"></router-link></h1>
		<div class="sign">
			<div v-if="getMyInfo">
				<b-dropdown :text=getMyInfo?.nickname variant="outline-dark">
					<b-dropdown-item @click="signout">Signout</b-dropdown-item>
				</b-dropdown>
			</div>
			<div v-else>
				<b-button @click="open" variant="outline-dark">Sign</b-button>
			</div>
		</div>
		<div class="menuWrap">
			<ul class="menu">
				<li><router-link to="/card">CARD</router-link></li>
				<li><router-link to="/todo">TODO</router-link></li>
				<li><router-link to="/schedule">SCHEDULE</router-link></li>
				<li><a href="javascript:;">메뉴4</a></li>
			</ul>
		</div>

		<SignModal ref="signModal" />
	</header>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue';
import SignModal from '../sign/signModal.vue';

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
header{width:100%; text-align:center; position:relative; height:120px; border-bottom:1px solid #35495e}
header h1{position:absolute; top:0; left:100px;}
header ul.menu:after{display:block; clear:both; content:'';}
header ul.menu{position:absolute; top:20px; right:50px;}
header ul.menu li{float:left; padding:10px 20px; list-style:none;}
header div.sign{position:absolute; top:-20px; right:60px;}

a{text-decoration:none; color:#333;}
</style>
<template>
  <v-app-bar
    app
    absolute
    density="compact"
  >
    <v-app-bar-nav-icon size="small" @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Vue3Project</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="getMyInfo">
      <v-menu
        top
        :close-on-content-click="closeOnContentClick"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
          >
            {{getMyInfo?.nickname}}님
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-on:click="signout">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-else>
      <v-btn
        class="mr-4 ml-5"
        plain
        @click="open"
      >
        <span>Sign In</span>
      </v-btn>
    </div>


  </v-app-bar>
  <v-navigation-drawer
    app
    v-model="drawer"
    absolute
    temporary
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <router-link to ="/card"><v-list-item prepend-icon="mdi-home" title="Card"></v-list-item></router-link>
        <router-link to ="/todo"><v-list-item prepend-icon="mdi-account" title="Todo"></v-list-item></router-link>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
  <SignDialog ref="dialog"/>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue';
import SignDialog from '@/components/sign/SignDialog.vue';

export default defineComponent ({
  components: {
    SignDialog,
  },
  setup () {
    const dialog = ref<null | { open: () => null }>(null);
    const open = () => dialog.value?.open();
    return { dialog, open, };
  },
  data: () => ({
    drawer: false,
    group: null,
    closeOnContentClick: true,
  }),
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
})
</script>

<style scoped>
a{text-decoration:none; color:#333;}
</style>

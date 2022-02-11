<template>
  <v-app-bar
    app
    absolute
    density="compact"
  >
    <v-app-bar-nav-icon size="small" @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title @click="this.$router.push('/')">Vue3Project</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="me">
      <v-menu
        top
        :close-on-content-click="closeOnContentClick"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
          >
            {{me?.nickname}}님
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
import { computed, defineComponent, ref, } from 'vue';
import { useRouter, } from 'vue-router';
import { useStore } from 'vuex';

import SignDialog from '@/components/sign/SignDialog.vue';

export default defineComponent ({
  components: {
    SignDialog,
  },
  setup () {
    const store = useStore();
    const router = useRouter();
    const dialog = ref<null | { open: () => null }>(null);
    const open = () => dialog.value?.open();
    const me = computed(() => store.getters.getMyInfo);
    const signout = () => {
      store.commit('SIGNOUT');
      router.go(0);
    }

    return {
      dialog,
      open,
      me,
      signout,

      // drawer: false,
      // group: null,
      // closeOnContentClick: true,
    };
  },
  data() {
    return {
      drawer: false,
      group: null,
      closeOnContentClick: true,
    }
  }
})
</script>

<style scoped>
a{text-decoration:none; color:#333;}
</style>

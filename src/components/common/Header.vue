<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-toolbar-title>
        <!-- <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar> -->
        Title
      </q-toolbar-title>
      <div v-if="me">
        <q-btn flat>
          <Avatar size="25px" />
          {{me.nickname}}님
          <q-menu fit>
            <q-item clickable v-close-popup @click="actions.goUserSetting">
              <q-item-section>Setting</q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item clickable v-close-popup @click="actions.signout">
              <q-item-section>Sign Out</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </div>
      <div v-else>
        <q-btn flat label="Sign" @click="open"/>
      </div>
    </q-toolbar>

    <q-tabs align="center" inline-label>
      <template v-for="(route, index) in routes" :key="index">
        <q-route-tab v-show="route.show" :to="route.path" :label="route.name" :icon="route.icon"/>
      </template>
    </q-tabs>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" side="left" bordered>
    <q-list v-for="(route, index) in routes" :key="index">
      <template v-if="route.show">
        <q-item clickable @click="changePage(route.path)">
          <q-item-section avatar>
            <q-icon :name="route.icon" />
          </q-item-section>
          <q-item-section>{{route.name}}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
  <SignDialog ref="dialog"/>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { routes } from '@/router';
import SignDialog from '@/components/sign/SignDialog.vue';
import Avatar from '@/components/user/Avatar.vue';

export default {
  components: {
    SignDialog,
    Avatar,
  },
  setup () {
    const store = useStore();
    const router = useRouter();

    const leftDrawerOpen = ref(false);
    const me = computed(() => store.getters.getMyInfo);

    const dialog = ref<null | { open: () => null }>(null);
    const open = () => dialog.value?.open();

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    function changePage (path: string) {
      toggleLeftDrawer();
      router.push(path);
    }

    const actions = {
      goUserSetting: () => {
        router.push('/user/setting');
      },
      signout: () => {
        store.commit('SIGNOUT');
        router.go(0);
      },
    }

    return {
      routes,
      me,
      actions,

      dialog,
      open,

      leftDrawerOpen,
      toggleLeftDrawer,
      changePage,
    };
  }
}
</script>

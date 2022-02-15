<template>
  <div class="row justify-center q-pa-md">
    <div class="col-6">
      <q-card class="q-pa-md">
        <div class="column">
          <div class="row justify-end">
            <q-btn flat :icon="!editMode ? 'edit' : 'clear'" @click="editMode = !editMode"/>
          </div>
          <div class="row justify-center">
            <div class="column">
              <div class="q-pa-md">
                <Avatar size="100px" ref="avatar"/>
              </div>
              <div v-show="editMode">
                <input type="file" ref="uploader" accept="image/*" style="display: none;" @change="changeImage"/>
                <q-btn label="Upload Image" @click="$refs.uploader.click()"/>
              </div>
            </div>
          </div>
          <div class="row justify-center q-pa-md">
            <div class="column">
              <q-input label="ID" class="text-h5" stack-label disable v-model="me.uid"/>
              <q-input label="Nickname" class="text-h5" stack-label :disable="!editMode" v-model="me.nickname"/>
            </div>
          </div>
          <div class="row justify-end q-pa-md" v-show="editMode">
            <q-btn label="save" @click="updateUser"/>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import Avatar from '@/components/user/Avatar.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    Avatar
  },
  setup() {
    const store = useStore();

    const me = ref(computed(() => store.getters.getMyInfo));
    const editMode = ref(false);
    const file = ref<any>(null);
    const avatar = ref<null | { updateView(file: any): null }>(null);

    function changeImage(e: any) {
      const files = e.target.files;
      file.value = files[0];
      avatar.value?.updateView(files[0]);
    }
    async function updateUser() {
      if (file.value) {
        const newfile = await store.dispatch('addFile', { category: 'avatar', file: file.value }, { root: true });
        console.log('new', newfile)
        me.value.avatar = newfile._id;
      }
      await store.dispatch('updateUser', me.value);
      editMode.value = false;
    }

    return {
      me,
      avatar,
      editMode,
      changeImage,
      updateUser,
    }
  }
}
</script>

<style>
</style>

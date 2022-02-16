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
                <ImagePicker ref="picker" @changed="getImages" />
                <q-btn label="Upload Image" @click="open"/>
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import Avatar from '@/components/user/Avatar.vue';
import ImagePicker from '@/components/common/ImagePicker.vue';

export default {
  components: {
    Avatar,
    ImagePicker,
  },
  setup() {
    const store = useStore();

    const me = ref(computed(() => store.getters.getMyInfo));
    const editMode = ref(false);
    const file = ref<any>(null);
    const avatar = ref<null | { updateView(file: any): null }>(null);

    const picker = ref<null | { open: () => null, getImages: () => any }>(null);
    const open = () => picker.value?.open();

    const getImages = async () => {
      const images = picker.value?.getImages();
      file.value = images;
      avatar.value?.updateView(images[0]);
    };

    async function updateUser() {
      if (file.value) {
        const [newfile] = await store.dispatch('addFile', { category: 'avatar', files: file.value });
        me.value.avatar = newfile._id;
      }
      await store.dispatch('updateUser', me.value);
      editMode.value = false;
    }

    return {
      me,
      avatar,
      picker,
      editMode,
      getImages,
      updateUser,
      open,
    }
  }
}
</script>

<style>
</style>

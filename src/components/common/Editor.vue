<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="qeditor"
      :dense="$q.screen.lt.md"
      :definitions="{
        upload: {
          tip: 'Upload image',
          icon: 'image',
          handler: open,
        }
      }"
      :toolbar="[
        ['left', 'center', 'right', 'justify'],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', ],
        [
          {
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            icon: $q.iconSet.editor.fontSize,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource'],
        ['upload'],
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />
    </div>
    <ImagePicker ref="picker" @changed="getImages" :multiple="true"/>
</template>

<script lang="ts">
import { ref } from 'vue';

import ImagePicker from '@/components/common/ImagePicker.vue';
import store from '@/store';
import { IFile } from '@/interfaces/file';

export default {
  props: {
    contents: {
      type: String,
      default: '',
    }
  },
  components: {
    ImagePicker,
  },
  setup (props: any) {
    const qeditor = ref(props.contents);
    const getValue = () => qeditor.value;

    const picker = ref<null | { open: () => null, getImages: () => any }>(null);
    const open = () => picker.value?.open();

    const getImages = async () => {
      const images = picker.value?.getImages();
      const newfiles = await store.dispatch('addFile', { category: 'card', files: images });
      let ctx = '';
      newfiles.forEach((file:IFile) => {
        ctx += `
        <div class="image_view">
          <img src="${file.path}"/>
        </div>
        `;
      });
      qeditor.value += ctx;
    };

    return {
      qeditor,
      getValue,

      picker,
      open,
      getImages,
    };
  }
}
</script>
<style scoped>
</style>

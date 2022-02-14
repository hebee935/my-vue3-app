<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="qeditor"
      :dense="$q.screen.lt.md"
      :definitions="{
        upload: {
          tip: 'Upload image',
          icon: 'image',
          handler: uploadIt,
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
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  props: {
    contents: {
      type: String,
      default: '',
    }
  },
  setup (props) {
    const $q = useQuasar();
    const qeditor = ref(props.contents);
    const getValue = () => qeditor.value;

    function uploadIt () {
      $q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning'
      })
    }


    return {
      qeditor,
      getValue,
      uploadIt,
    };
  }
}
</script>

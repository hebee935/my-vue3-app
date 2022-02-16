<template>
  <div class="q-pa-md">
    <q-input bottom-slots autogrow placeholder="Tag" v-model="input" @keyup.enter="pushTag" @keyup.space="pushTag">
      <template v-slot:prepend>
        <div v-for="(tag, index) in tags" :key="index">
          <q-chip square :label="`#${tag.title}`" removable @remove="removeTag(index)"/>
          </div>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    card: {
      type: Object,
      required: false,
    },
  },
  components: {
  },
  setup(props) {
    const store = useStore();
    const input = ref('');
    const tags = ref<any>(computed(() => store.getters.getTagList));
    const willDeletedTags = ref<any>([]);

    onBeforeMount(async() => {
      if (props.card) {
        await store.dispatch('getTags', { cardid: props.card._id });
      } else {
        store.commit('CLEAR_TAGS');
      }
    });

    function pushTag() {
      input.value = input.value.replace(/\n| /g, '');
      if (input.value.length) tags.value.push({ title: input.value });
      input.value = '';
    }
    function removeTag(idx: number) {
      if (tags.value[idx]._id) {
        willDeletedTags.value.push(tags.value[idx]);
      }
      tags.value.splice(idx, 1);
    }
    function getTags() {
      return tags.value.reduce((acc: any, curr: any, idx: number) => {
        const findIdx = acc.findIndex((a: any) => a.title === curr.title);
        if (findIdx === -1) {
          acc.push(curr);
        } else if (!acc[findIdx]._id && curr._id) {
          acc[findIdx] = curr;
        }
        return acc;
      }, []).filter((tag:any) => !tag._id);
    }
    function getDeletedTags() {
      return willDeletedTags.value;
    }

    return {
      tags,
      input,
      removeTag,
      pushTag,

      getTags,
      getDeletedTags,
    }
  }

});
</script>

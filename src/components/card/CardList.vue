<template>
  <div class="q-pa-md">
    <q-table
      :rows="cards"
      :columns="columns"
      row-key="_id"
      :loading="loading"
      v-model:pagination="pagination"
      hide-pagination
      hide-header
      @row-click="gotoDetailView"
      flat
    >
      <template v-slot:top>
        <q-space />
        <q-input color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div v-if="me" class="q-pl-md">
          <q-btn color="primary" :disable="loading" label="Create" @click="createCard" />
        </div>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { ICard } from '@/interfaces/card';
import { getDate } from '@/lib/utils';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const loading = ref(false);
    const filter = ref('');
    onBeforeMount(async() => store.dispatch('setCards'));

    const me = computed(() => store.getters.getMyInfo);

    const columns = [
      { name: 'title', field: (row: ICard) => row.title, sortable: true, align: 'center' },
      { name: 'user', field: (row: ICard) => row.user.nickname, sortable: true, align: 'center' },
      { name: 'created', field: (row: ICard) => getDate(row.updatedAt), sortable: true, align: 'center' },
    ];
    const cards = computed(() => store.getters.getCardList);
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10,
    });
    const pagesNumber = computed(() => Math.ceil(cards.value.length / pagination.value.rowsPerPage));

    function createCard() {
      router.push('/card/create');
    }
    function gotoDetailView(_e: object, row:ICard) {
      router.push(`/card/${row._id}`);
    }

    return {
      loading,
      filter,

      me,
      cards,
      columns,
      pagination,
      pagesNumber,

      getDate,
      createCard,
      gotoDetailView,
    };
  },
});
</script>

<style scoped>

</style>

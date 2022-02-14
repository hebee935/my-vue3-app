<template>
  <div class="q-pa-md">
    <q-form @submit="signin">
      <q-input outlined v-model="form.uid" label="ID" :rules="rules.uid"/>
      <q-input outlined :type="isPwd ? 'password' : 'text'" v-model="form.password" label="Password" :rules="rules.password">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="row justify-end">
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, } from 'vue';
import { useStore } from 'vuex';

export default defineComponent ({
  setup(_, { emit }) {
    const store = useStore();

    const form = ref({
      uid: '',
      password: '',
    });
    const isPwd = ref(true);

    const rules = {
      uid: [ (val: string) => val && val.length > 0 || 'Please enter ID'],
      password: [ (val: string) => val && val.length > 0 || 'Please enter Password'],
    };

    async function signin() {
      await store.dispatch('signin', form.value);
      emit('close');
    }

    return {
      form,
      isPwd,
      rules,

      signin,
    }
  },
});
</script>

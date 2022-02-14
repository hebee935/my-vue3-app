<template>
  <div class="q-pa-md">
    <q-form @submit="signup">
      <q-input outlined v-model="form.uid" label="ID" :rules="rules.uid"/>
      <q-input outlined v-model="form.nickname" label="Nickname" :rules="rules.nickname"/>
      <q-input outlined :type="isPwd.o ? 'password' : 'text'" v-model="form.password" label="Password" :rules="rules.password">
        <template v-slot:append>
          <q-icon
            :name="isPwd.o ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd.o = !isPwd.o"
          />
        </template>
      </q-input>
      <q-input outlined :type="isPwd.r ? 'password' : 'text'" v-model="form.repassword" label="Re Password" :rules="rules.repassword">
        <template v-slot:append>
          <q-icon
            :name="isPwd.r ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd.r = !isPwd.r"
          />
        </template>
      </q-input>
      <q-toggle v-model="form.accept" label="I accept the license and terms" />

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
      nickname: '',
      password: '',
      repassword: '',
      accept: false,
    });
    const isPwd = ref({
      o: true,
      r: true,
    });

    const rules = {
      uid: [ (val: string) => val && val.length > 0 || 'Please enter ID'],
      nickname: [ (val: string) => val && val.length > 0 || 'Please enter Nickname'],
      password: [ (val: string) => val && val.length > 0 || 'Please enter Password'],
      repassword: [
        (val: string) => val && val.length > 0 || 'Please enter Password',
        (val: string) => val && form.value.password === val || ' Not Equal Password',
      ],
    };

    async function signup() {
      await store.dispatch('signup', form.value);
      emit('close');
    }

    return {
      form,
      isPwd,
      rules,

      signup,
    }
  },
});
</script>

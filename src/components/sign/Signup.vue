<template>
  <v-card-title>Sign Up</v-card-title>
  <v-card-text>
    <v-form>
      <v-text-field v-model="v$.form.uid.$model" label="ID"/>
      <v-text-field v-model="v$.form.nickname.$model" label="Nickname"/>
      <v-text-field v-model="v$.form.password.$model" label="Password"/>
      <v-text-field v-model="v$.form.repassword.$model" label="Re Password"/>
      <v-btn class="mr-4" @click="signup" :disabled="v$.form.$invalid">Sign Up</v-btn>
    </v-form>
  </v-card-text>
</template>
<script lang="ts">
import { defineComponent, } from 'vue';
import useVuelidate from "@vuelidate/core";
import { required, } from '@vuelidate/validators';

export default defineComponent ({
  setup() {

    return { v$: useVuelidate(), };
  },
  data() {
    const page: any = {
      signin: true,
      signup: false,
    };

    return {
      form: {
        uid: '',
        password: '',
        repassword: '',
        nickname: '',
      },
      page,
    };
  },
  validations() {
    return {
      form: {
        uid: {
          required,
        },
        password: {
          required,
        },
        repassword: {
          required,
        },
        nickname: {
          required,
        },
      },
    }
  },

  methods: {
    async signup() {
      await this.$store.dispatch('signup', this.form);
      this.$emit('close');
      this.$router.go(0);
    }
  }
});
</script>

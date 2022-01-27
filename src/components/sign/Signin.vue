<template>
  <v-card-title>Sign In</v-card-title>
  <v-card-text>
    <v-form>
      <v-text-field v-model="v$.form.uid.$model" label="ID"/>
      <v-text-field v-model="v$.form.password.$model" label="Password"/>
      <v-btn class="mr-4" @click="signin" :disabled="v$.form.$invalid">Sign In</v-btn>
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
    return {
      form: {
        uid: '',
        password: '',
      },
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
        }
      },
    }
  },
  methods: {
    async signin() {
      const result = await this.$store.dispatch('signin', this.form);
      console.log('result', result);
      this.$emit('close');
    }
  }
});
</script>

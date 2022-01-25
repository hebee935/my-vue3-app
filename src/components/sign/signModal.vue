<template>
  <Modal ref="signModal">
    <div id="signin" v-show="page.signin">
      <b-form @submit="signin">
        <b-form-group
          id="uid-group"
          label="ID"
          label-for="uid">
          <b-form-input
            id="uid"
            v-model="form.uid"
            placeholder="Enter ID"
            required />
        </b-form-group>
        <b-form-group
          id="password-group"
          label="Password"
          label-for="password">
          <b-form-input
            id="password"
            v-model="form.password"
            placeholder="Enter Password"
            type="password"
            required />
        </b-form-group>
        <div v-show="form.notFoundUser"><p>해당하는 유저를 찾을 수 없습니다.</p></div>
        <b-button type="submit" variant="primary">Signin</b-button>
        <p>Or</p><p v-on:click="changePage('signup')">Sign Up</p> / <p v-on:click="changePage('findPassword')">Find Password</p>
      </b-form>
    </div>
    <div id="signup" v-show="page.signup">
      <p v-on:click="changePage('signin')">Back</p>
      <b-form @submit="signup">
        <b-form-group
          id="uid-group"
          label="ID"
          label-for="uid">
          <b-form-input
            id="uid"
            v-model="form.uid"
            placeholder="Enter ID"
            required />
          <b-button v-on:click="checkUid">중복체크</b-button>
          <div v-show="form.checkedUidMsg"><p>{{form.checkedUidMsg}}</p></div>
        </b-form-group>
        <b-form-group
          id="password-group"
          label="Password"
          label-for="password">
          <b-form-input
            id="password"
            v-model="form.password"
            placeholder="Enter Password"
            type="password"
            required />
          <b-form-input
            id="password-check"
            v-model="form.repassword"
            placeholder="Check Password"
            type="password"
            required />
          <div v-show="form.notMatchedPW"><p>패스워드가 일치하지 않습니다.</p></div>
        </b-form-group>
        <b-form-group
          id="nickname-group"
          label="Nickname"
          label-for="nickname">
          <b-form-input
            id="nickname"
            v-model="form.nickname"
            placeholder="Enter Nickname"
            required />
        </b-form-group>
        <b-button type="submit" variant="primary">Signup</b-button>
      </b-form>
    </div>
  </Modal>
</template>

<script lang="ts">
import Modal from '../common/Modal.vue';
import { defineComponent, ref, } from 'vue';
import { useStore } from 'vuex';

class Form {
  uid: string;
  password: string;
  repassword?: string;
  nickname?: string;
  uidChecked: boolean;
  notFoundUser: boolean;
  notMatchedPW: boolean;
  checkedUidMsg: string | null;

  constructor() {
    this.uid = '';
    this.password = '';
    this.repassword = '';
    this.nickname = '';
    this.uidChecked = false;
    this.notFoundUser = false;
    this.notMatchedPW = false;
    this.checkedUidMsg = null;
  }
  
  get() {
    return {
      uid: this.uid,
      password: this.password,
      repassword: this.repassword,
      nickname: this.nickname,
      uidChecked: this.uidChecked,
      notFoundUser: this.notFoundUser,
      checkedUidMsg: this.checkedUidMsg,
      notMatchedPW: this.notMatchedPW,
    };
  }
}

export default defineComponent({
    components: {
        Modal,
    },
    setup() {
      const store = useStore();
      const signModal = ref<null | { open: () => null, close: () => null, }>(null);
      const page = ref<{ [key: string]: Boolean }>({
        signin: true,
        signup: false,
        findPassword: false,
      });
      const form = ref(new Form().get());

      function changePage(pagename: string): void {
        Object.keys(page.value).forEach(key => {
          if (key === pagename) page.value[key] = true;
          else page.value[key] = false;
        });
        clear();
      }

      const open = () => {
        changePage('signin');
        signModal.value?.open();
      };

      const clear = () => {
        form.value = new Form().get();
      };

      async function signin(): Promise<void> {
        const result = await store.dispatch('signin', form.value);
        if (result) signModal.value?.close();
        else form.value.notFoundUser = true;
        console.log(store.getters.getMyInfo)
      }

      async function signup(): Promise<void> {
        if (form.value.uidChecked === false) {
          form.value.checkedUidMsg = '아이디 중복 확인을 해주세요.';
        } else if (form.value.password !== form.value.repassword) {
          form.value.notMatchedPW = true;
        } else {
          const result = await store.dispatch('signup', form.value);
          if (result) signModal.value?.close();
        }
      }

      async function checkUid(): Promise<void> {
        const result = await store.dispatch('checkUid', form.value.uid);
        form.value.uidChecked = result;
        form.value.checkedUidMsg = result ? '사용 가능한 아이디입니다.' : '이미 사용중인 아이디입니다.';
      }

      return { signModal, open, page, changePage, signin, signup, form, checkUid, };
    },
});
</script>
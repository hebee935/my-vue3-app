<template>
    <Modal ref="signModal">
        <div v-show="page.signin">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Sign In</h5>
                <button @click="close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form :class=form.validation novalidate>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="uid" v-model="form.uid" placeholder="ID" required>
                        <label for="uid">ID</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Password" required>
                        <label for="password">Password</label>
                    </div>
                    <div class="mb-3" v-show="form.notFoundUser">입력하신 데이터와 일치하는 유저가 존재하지 않습니다.</div>
                    <div class="col-sm">
                        <button type="button" @click="signin" class="btn btn-outline-dark" data-bs-dismiss="modal">Sign In</button>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="mx-auto">
                    <p v-on:click="changePage('signup')">Or Sign Up</p>
                </div>
            </div>
        </div>
        <div v-show="page.signup">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
                <button @click="close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form :class=form.validation novalidate>
                    <div class="input-group mb-3">
                        <div class="form-floating col-sm">
                            <input type="text" class="form-control" id="uid" v-model="form.uid" placeholder="ID" aria-describedby="uid-check" required>
                            <label for="uid">ID</label>
                        </div>
                        <button class="btn btn-outline-secondary" id="uid-check" type="button" @click="checkUid">중복체크</button>
                    </div>
                    <div class="mb-3" v-show="form.checkedUidMsg">{{form.checkedUidMsg}}</div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="nickname" v-model="form.nickname" placeholder="Nickname" required>
                        <label for="nickname">Nickname</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Password" required>
                        <label for="password">Password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="repassword" v-model="form.repassword" placeholder="Password" required>
                        <label for="repassword">Re Password</label>
                    </div>
                    <div class="mb-3" v-show="form.notMatchedPW">패스워드가 일치하지 않습니다.</div>
                    <div class="col-sm">
                        <button type="button" @click="signup" class="btn btn-outline-dark" data-bs-dismiss="modal">Sign Up</button>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="mx-auto">
                    <p v-on:click="changePage('signin')">Or Sign In</p>
                </div>
            </div>
        </div>
  </Modal>
</template>

<script lang="ts">
import Modal from '../common/Modal.vue';
import { defineComponent, ref, } from 'vue';
import { useStore } from 'vuex';

class Form {
  validation: string;
  uid: string;
  password: string;
  repassword?: string;
  nickname?: string;
  uidChecked: boolean;
  notFoundUser: boolean;
  notMatchedPW: boolean;
  checkedUidMsg: string | null;

  constructor() {
    this.validation = 'needs-validation';
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
      validation: this.validation,
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
      const close = () => {
        signModal.value?.close();
      };

      const clear = () => {
        form.value = new Form().get();
      };

    async function signin(): Promise<void> {
        if (!form.value.uid.length || !form.value.password.length) {
            form.value.validation += ' was-validated';
        } else {
            const result = await store.dispatch('signin', form.value);
            if (result) signModal.value?.close();
            else form.value.notFoundUser = true;
        }
      }

      async function signup(): Promise<void> {
        let valid = true;
        if (!form.value.uidChecked) {
          valid = false;
          form.value.checkedUidMsg = '아이디 중복 확인을 해주세요.';
        } else if (form.value.password !== form.value.repassword) {
          valid = false;
          form.value.notMatchedPW = true;
        }
        if (!valid) {
            form.value.validation += ' was-validated';
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

      return { signModal, open, close, page, changePage, signin, signup, form, checkUid, };
    },
});
</script>
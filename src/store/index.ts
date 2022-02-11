import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { TodoModule, TodoState, } from './modules/todo';
import { CardModule, CardState, } from './modules/card';
import { UserModule, UserState, } from './modules/user';
import { AuthModule, AuthState, } from './modules/auth';
import { CommentModule, CommentState, } from './modules/comment';

export interface RootState {
  todo: TodoState,
  card: CardState,
  user: UserState,
  auth: AuthState,
  comment: CommentState,
}

export default new Vuex.Store({
  modules: {
    TodoModule,
    CardModule,
    UserModule,
    AuthModule,
    CommentModule,
  },
  plugins: [
    // createPersistedState(),
  ]
});

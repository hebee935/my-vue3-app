import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { TodoModule as todo, TodoState, } from './modules/todo';
import { CardModule as card, CardState, } from './modules/card';
import { UserModule as user, UserState, } from './modules/user';
import { AuthModule as auth, AuthState, } from './modules/auth';
import { CommentModule as comment, CommentState, } from './modules/comment';
import { FileModule as file, FileState, } from './modules/file';

export interface RootState {
  todo: TodoState;
  card: CardState;
  user: UserState;
  auth: AuthState;
  comment: CommentState;
  file: FileState;
}

export default createStore({
  modules: {
    todo,
    card,
    user,
    auth,
    comment,
    file,
  },
  plugins: [
    createPersistedState(),
  ]
});

import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { TodoModule, TodoState, } from './modules/todo';
import { CardModule, CardState, } from './modules/card';
import { UserModule, UserState, } from './modules/user';
import { AuthModule, AuthState, } from './modules/auth';

export interface RootState {
    todo: TodoState,
    card: CardState,
    user: UserState,
    auth: AuthState,
}

export default new Vuex.Store({
    modules: {
        TodoModule,
        CardModule,
        UserModule,
        AuthModule,
    },
    plugins: [
        // createPersistedState({
        //     // paths: ['AuthModule']
        // }),
    ]
});
import { createRouter, createWebHistory, } from 'vue-router';

export const routes = [
  {
    path:'/',
    name: 'Main',
    show: false,
    component: () => import('@/components/Main.vue'),
  },
  {
    path:'/user/setting',
    name: 'UserSetting',
    show: false,
    component: () => import('@/components/user/UserSetting.vue'),
  },
  {
    path:'/card',
    name: 'Card',
    show: true,
    icon: 'inbox',
    component: () => import('@/components/card/CardList.vue'),
  },
  {
    path:'/card/create',
    name: 'CardCreate',
    component: () => import('@/components/card/CardInput.vue'),
  },
  {
    path:'/card/:cardid',
    name: 'CardDetail',
    component: () => import('@/components/card/CardDetail.vue'),
  },
  {
    path:'/card/:cardid/update',
    name: 'CardUpdate',
    component: () => import('@/components/card/CardUpdate.vue'),
  },
  {
    path:'/todo',
    name: 'Todo',
    show: true,
    icon: 'check_box',
    component: () => import('@/components/todo/TodoList.vue'),
  },
];
export default createRouter({ //라우터 연결
  history : createWebHistory(),
	routes,
});

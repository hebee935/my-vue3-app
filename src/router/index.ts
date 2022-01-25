import { createRouter, createWebHistory, } from 'vue-router';

export default createRouter({ //라우터 연결
    history : createWebHistory(),
	routes:[
		{
			path:'/'
            ,name: 'Main'
			,component: () => import('@/components/Main.vue'),
		},
		{
			path:'/card'
            ,name: 'Card-list'
			,component: () => import('@/components/card/List.vue'),
		},
        {
			path:'/card/create'
            ,name: 'Card-create'
			,component: () => import('@/components/card/Input.vue'),
		},
		{
			path:'/card/:cardid'
            ,name: 'Card-detail'
			,component: () => import('@/components/card/Detail.vue'),
		},
        {
			path:'/todo'
            ,name: 'Todo-list'
			,component: () => import('@/components/todo/List.vue'),
		},
		{
			path:'/schedule'
            ,name: 'Schedule-calendar'
			,component: () => import('@/components/schedule/Calendar.vue'),
		}
		
	]
})
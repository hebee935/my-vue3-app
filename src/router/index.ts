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
			,component: () => import('@/components/card/CardList.vue'),
		},
        {
			path:'/card/create'
            ,name: 'Card-create'
			,component: () => import('@/components/card/CardInput.vue'),
		},
		{
			path:'/card/:cardid'
            ,name: 'Card-detail'
			,component: () => import('@/components/card/CardDetail.vue'),
		},
        {
			path:'/todo'
            ,name: 'Todo-list'
			,component: () => import('@/components/todo/TodoList.vue'),
		},
		{
			path:'/schedule'
            ,name: 'Schedule-calendar'
			,component: () => import('@/components/schedule/ScheduleCalendar.vue'),
		}

	]
})

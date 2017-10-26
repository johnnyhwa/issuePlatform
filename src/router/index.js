import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Entering from '@/components/Entering'
import Table from '@/components/Table'
import Detail from '@/components/Detail'
import List from '@/components/List'
import Catalog from '@/components/Catalog'
import SignIn from '@/components/SignIn'
import Index from '@/components/Index'
import Logs from '@/components/Logs'
import Tags from '@/components/Tags'
import Export from '@/components/Export'
import Dashboard from '@/components/Dashboard'
import Config from '@/components/Config'
import About from '@/components/About'

Vue.use(Router)

const routes = [{
        path: '/login',
        name: 'login',
        component: SignIn
    },
    {
        path: '/home',
        component: Home,
        children: [
            { path: '', redirect: 'index' },
            { path: 'index', component: Index },
            { path: 'entering', name: 'entering page', component: Entering },
            {
                path: 'catalog',
                component: Catalog,
                children: [
                    { path: '', component: List },
                    { path: 'detail', name: 'detail', component: Detail, props: true },
                    { path: 'list', component: List }
                ]
            },
            { path: 'table', name: 'table page', component: Table },
            { path: 'logs', name: 'log page', component: Logs },
            { path: 'tags', name: 'tag page', component: Tags },
            { path: 'export', name: 'export page', component: Export },
            { path: 'dashboard', name: 'dashboard', component: Dashboard },
            { path: 'config', name: 'config page', component: Config },
            { path: 'about', name: 'about page', component: About }
        ]
    },
    { path: '*', redirect: '/home' }
]

const router = new Router({
    //mode: 'history',
    //base: __dirname,
    routes
})

import store from '@/store/store'

router.beforeEach((to, from, next) => {
    //debugger;
    //let hasLogin = store.getters.getLogin
    let hasLogin = window.sessionStorage.getItem('user');
    if (to.matched[0].path != '/login' && !hasLogin) {
        next('/login')
    } else {
        next()
    }

})

export default router
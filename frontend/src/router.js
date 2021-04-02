import Vue from 'vue'
import Router from 'vue-router'
import PKIIdLogin from './views/PKIIdLogin.vue'
import config from './config'
import Dashboard from './views/Dashboard.vue'
import fetch from 'node-fetch'
import Investor from './views/Investor.vue';
import Project from './views/Project.vue';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/login',
            redirect: '/studio/login'
        },
        {
            path: '/studio',
            redirect: '/studio/login'
        },
        {
            path: '/studio/login',
            name: 'PKIIdLogin',
            component: PKIIdLogin
        },
        {
            path: '/studio/investor',
            name: 'investor',
            component: Investor,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/studio/procurment',
            name: 'procurment',
            component: Investor,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/studio/project',
            name: 'project',
            component: Project,
            meta: {
                requiresAuth: false
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const url = `${config.studioServer.BASE_URL}protected`
            console.log(url)
            console.log('...............')
            fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    },
                    method: "POST"
                }).then(res => res.json())
                .then(json => {
                    console.log('...............')
                    console.log(json.message)
                    if (json.status == 403) {
                        next({
                            path: '/studio/login',
                            params: { nextUrl: to.fullPath }
                        })
                    } else {
                        console.log(json.message)
                        localStorage.setItem("user", JSON.stringify(json.message));
                        next()
                    }
                })
                .catch((e) => {
                    next({
                        path: '/studio/login',
                        params: { nextUrl: to.fullPath }
                    })
                })
        } else {
            next({
                path: '/studio/login',
                params: { nextUrl: to.fullPath }
            })
        }
    } else {
        next()
    }
})
export default router
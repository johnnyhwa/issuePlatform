import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import login from './login'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug, //非生产环境下
    modules: {
        user,
        login
    }
})
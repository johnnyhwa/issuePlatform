import Vue from 'vue'

export default {
    state: JSON.parse(sessionStorage.getItem('user')) || {},
    mutations: {
        logIn(state, user) {
            sessionStorage.setItem('user', JSON.stringify(user))

            Object.assign(state, user)
        },

        logOut(state) {
            sessionStorage.removeItem('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
            Object.assign(state, {})
        }
    },
    actions: {
        logIn({ commit }, user) {
            commit('logIn', user)
        },
        logOut({ commit }) {
            commit('logOut')
        }
    }
}
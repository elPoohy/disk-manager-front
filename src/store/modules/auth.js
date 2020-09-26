import { apolloClient } from '@/vue-apollo'
import { AUTH_REQUEST_GQL } from '@/queries/mutations'
import { CURRENT_USER_GQL } from '@/queries/queries'
const state = {
    user: {},
    hasLoadedOnce: false,
    token: localStorage.getItem("apollo-token") || "",
    authStatus: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.user.fullAdmin,
    validToken: state => state.token,
    authStatus: state => state.authStatus,
    user: state => state.user,
};

const actions = {
    async LOGIN_USER ({ commit, dispatch }, user)  {
        try {
            localStorage.setItem('apollo-token', '')
            const { data } = await apolloClient.mutate({ mutation: AUTH_REQUEST_GQL, variables: { ...user } })
            const token = data.login.access_token
            commit('SET_TOKEN', token)
            localStorage.setItem('apollo-token', token)
            dispatch('GET_CURRENT_USER')
        } catch (e) {
            console.log(e)
        }
    },
    async GET_CURRENT_USER ({ commit } ) {
        const { data } = await apolloClient.query({ query: CURRENT_USER_GQL })
        console.log(data.User)
        commit('LOGIN_USER', data.User)
    },
    async LOGOUT_USER ({ commit }) {
        commit('LOGOUT_USER')
    },
};

const mutations = {
    SET_TOKEN (state, token) {
        state.token = token
    },
    LOGIN_USER (state, user) {
        console.log(user)
        console.log(state.user)
        state.authStatus = true
        state.user = { ...user }
        console.log(state.user)
    },
    LOGOUT_USER (state) {
        state.authStatus = ''
        state.token = '' && localStorage.removeItem('apollo-token')
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
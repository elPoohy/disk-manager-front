import Vue from "vue";
import {ALL_USERS_GQL} from "@/queries/queries";
import {DELETE_USER_GQL, CREATE_USER_GQL} from "@/queries/mutations";
import {apolloClient} from "@/vue-apollo";

const state = {
    users: [],
    status: false,
};

const getters = {
    allAdmins: state => state.admins,
    UsersStatus: state => state.status,
    allUsers: state => state.users,
};

const actions = {
    async ALL_USERS ({ commit }) {
        state.status = true;
        const { data } = await apolloClient.query({ query: ALL_USERS_GQL })
        commit('ALL_USERS_MUTATION', data.Users);
    },
    async DELETE_USER({dispatch}, user){
        await apolloClient.mutate({ mutation: DELETE_USER_GQL, variables: { ...user }})
        dispatch('ALL_TENANTS')
    },
    async CREATE_USER({commit}, user){
        state.status = true;
        console.log(user)
        const { data } = await apolloClient.mutate({mutation: CREATE_USER_GQL, variables: { ...user }})
        commit('CREATE_USER_MUTATION', data)
    }
};

const mutations = {
    ALL_USERS_MUTATION: (state, resp) => {
        state.status = false;
        Vue.set(state, "users", resp);
    },
    CREATE_USER_MUTATION: (state, resp) => {
        state.status = false;
        state.users.push(resp)
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
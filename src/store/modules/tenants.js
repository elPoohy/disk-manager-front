import Vue from "vue";
import {ALL_TENANTS_GQL} from "@/queries/queries";
import {DELETE_TENANT_GQL, CREATE_TENANT_GQL} from "@/queries/mutations";
import {apolloClient} from "@/vue-apollo";

const state = {
    tenants: [],
    status: false,
};

const getters = {
    allAdmins: state => state.admins,
    TenantStatus: state => state.status,
    allTenants: state => state.tenants,
};

const actions = {
    async ALL_TENANTS ({ commit }) {
        state.status = true;
        const { data } = await apolloClient.query({ query: ALL_TENANTS_GQL })
        commit('ALL_TENANTS_MUTATION', data.Tenants);
    },
    async DELETE_TENANT({dispatch}, tenant){
        await apolloClient.mutate({ mutation: DELETE_TENANT_GQL, variables: { ...tenant }})
        dispatch('ALL_TENANTS')
    },
    async CREATE_TENANT({commit}, tenant){
        state.status = true;
        const { data } = await apolloClient.mutate({mutation: CREATE_TENANT_GQL, variables: { ...tenant }})
        commit('CREATE_TENANT_MUTATION', data)
    }
};

const mutations = {
    ALL_TENANTS_MUTATION: (state, resp) => {
        state.status = false;
        Vue.set(state, "tenants", resp);
    },
    CREATE_TENANT_MUTATION: (state, resp) => {
        state.status = false;
        state.tenants.push(resp)
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
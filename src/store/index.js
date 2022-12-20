import { createStore } from 'vuex';
import { postJson, getJson } from '@/utils/https';

export default createStore({
  state: {
    token: localStorage.getItem('auth-token'),
    profile: {
      // firstName: '',
      // lastName: '',
      // gender: '',
      // yearOfBirth: ''
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    profile(state) {
      // console.log("state.profile in getter:", state.profile);
      return state.profile;
    },
  },
  mutations: {
    setToken(state, value) {
      if (value) {
        state.token = value;
        localStorage.setItem('auth-token', value);
      } else {
        state.token = null;
        localStorage.removeItem('auth-token');
      }
    },
    setProfile(state, profile) {
      console.log("2. profile in mutation:", profile);
      state.profile = profile;
    },
  },
  actions: {
    addProfile(context, data) {
      return postJson({
        url: '/profile',
        data
      }).then(data => {
        // console.log("profile in action:", data);
        if (data.profile) {
          context.commit('setProfile', data.profile);
          return data;
        }
      });
    },
    getProfile(context, data) {
      console.log("1. data in getprofile action:", data);
      return getJson({
        url: `/profile/${data.id}`
      }).then(data => {
        if (data.err) {
          return data;
        }
        context.commit('setProfile', data.profile);
        return data;
      });
    },
    registerUser(context, data) {
      return postJson({
        url: '/register',
        data
      }).then(obj => {
        if (obj.token) {
          context.commit('setToken', obj.token);
        }
        return obj;
      });
    },
    login(context, data) {
      return postJson({
        url: '/login',
        data
      }).then(obj => {
        if (obj.token) {
          context.commit('setToken', obj.token);
        }
        return obj;
      });
    },
  },
  modules: {
  }
});

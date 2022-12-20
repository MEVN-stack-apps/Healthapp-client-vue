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
      state.profile = profile;
    },
  },
  actions: {
    addProfile(context, data) {
      return postJson({
        url: '/profile',
        data
      }).then(data => {
        if (data.profile) {
          context.commit('setProfile', data.profile);
          return data;
        }
      });
    },
    getProfile(context) {
      return getJson({
        url: `/profile`
      }).then(data => {
        if (data.profile) {
          context.commit('setProfile', data.profile);
        }
        // if (data.err) {
        //   return data;
        // }
        // context.commit('setProfile', data.profile);
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

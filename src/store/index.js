import { createStore } from 'vuex';
import { postJson, getJson } from '@/utils/https';

export default createStore({
  state: {
    token: localStorage.getItem('auth-token'),
    profile: {},
    locations: [],
    location: {}
  },
  getters: {
    token(state) {
      return state.token;
    },
    profile(state) {
      return state.profile;
    },
    locations(state) {
      return state.locations;
    }
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
    setLocations(state, locations) {
      state.locations = locations;
    },
    setLocation(state, location) {
      state.location = location;
    }
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
        return data;
      });
    },
    getLocations(context) {
      return getJson({
        url: `/locations`
      }).then(data => {
        if (data.bodyLocations) {
          // console.log("data.bodyLocations:", data.bodyLocations);
          context.commit('setLocations', data.bodyLocations);
        }
        return data;
      });
    },
    saveLocation(context, data) {
      context.commit('setLocation', data);
      // save location to user database
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

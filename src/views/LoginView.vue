<template>
  <div class="col-4 offset-4 mt-3">
    <div class="mb-3">
      <label for="email" class="form-label">Email Address</label>
      <input type="email" class="form-control" id="email" v-model="email" placeholder="name@email.com" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" />
    </div>
    <div class="mb-3">
      <button class="btn btn-primary" @click.prevent="onSubmit">Login</button>
    </div>
    <div class="text-center">
      Need Account? <router-link to="/register">Register</router-link> Now
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: 'LoginView',

  setup() {
    const email = ref('');
    const password = ref('');
    const store = useStore();
    const router = useRouter();

    function onSubmit() {
      store.dispatch('login', {
        email: email.value,
        password: password.value
      }).then(res => {
        if (res.err) {
          alert(res.err);
          return;
        }
        router.push('/profile');
      });
    }

    return {
      email,
      password,
      onSubmit
    };
  },
};
</script>

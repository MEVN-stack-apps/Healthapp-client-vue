<template>
  <div class="profile">

    <div v-if="$store.getters.profile">
      <h4>My Profile</h4>
      <p>First Name: {{ $store.getters.profile.firstName }}</p>
      <p>Last Name: {{ $store.getters.profile.lastName }}</p>
      <p>Gender: {{ $store.getters.profile.gender }}</p>
      <p>Birth Year: {{ $store.getters.profile.yearOfBirth }}</p>
    </div>

    <div v-else>
      <h4>Create Profile</h4>
      <div class="mb-5">
        <div class="mb-3">
          <label for="first-name" class="form-label">
            First name
          </label>
          <input type="text" class="form-control" id="first-name" v-model="firstName" />
        </div>
        <div class="mb-3">
          <label for="last-name" class="form-label">
            Last name
          </label>
          <input type="text" class="form-control" id="last-name" v-model="lastName" />
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">
            Gender
          </label>
          <input type="text" class="form-control" id="gender" v-model="gender" />
        </div>
        <div class="mb-3">
          <label for="year-of-birth" class="form-label">
            Birth year
          </label>
          <input type="text" class="form-control" id="year-of-birth" v-model="yearOfBirth" />
        </div>
        <div class="mb-3">
          <button class="btn btn-primary" @click.prevent="addProfile()">Add Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const firstName = ref('');
    const lastName = ref('');
    const gender = ref('');
    const yearOfBirth = ref('');

    function addProfile() {
      store.dispatch('addProfile', {
        firstName: firstName.value,
        lastName: lastName.value,
        gender: gender.value,
        yearOfBirth: yearOfBirth.value
      }).then(data => {
        if (data.err) {
          alert(data.err);
          return;
        }
      });
    }

    store.dispatch('getProfile');
    
    return {
      addProfile,
      firstName,
      lastName,
      gender,
      yearOfBirth
    };
  }
}

</script>

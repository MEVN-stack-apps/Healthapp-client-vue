<template>
  <div>
    <h4>Health page</h4>
    <div>
      <h5>Select the Body location from below:</h5>
      <select v-model="selected" @change="saveLocation()">
        <option
          v-for="location in $store.getters.locations"
          :key="location"
          :value="location"
        >
          {{ location.Name }}
        </option>
      </select>
    </div>

    <div v-if="$store.getters.location.Name">
      <p>
        The selected body location is:
        <strong>{{ $store.getters.location.Name }}</strong>
      </p>
      <h5>
        Select the symptoms on {{ $store.getters.location.Name }} from below:
      </h5>
      {{ $store.getters.bodySymptoms }}

      <!-- <Multiselect v-model="symptoms" :options="$store.getters.bodySymptoms" /> -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
// import Multiselect from '@vueform/multiselect'

export default {
  components: {
    // Multiselect,
  },
  setup() {
    const store = useStore();
    const selected = ref("");
    // const symptoms = ref('');

    store.dispatch("getLocations").then((data) => {
      if (data.err) {
        alert(data.err);
        return;
      }
    });

    function saveLocation() {
      store.dispatch("saveLocation", selected.value).then((data) => {
        return data;
      });
      const locationId = store.getters.location.ID;
      const gender = store.getters.profile.gender;

      store
        .dispatch("getSymptomsByLocation", {
          locationId: locationId,
          gender: gender,
        })
        .then((data) => {
          console.log("data in get symptoms by location in view:", data);
          if (data.err) {
            alert(data.err);
            return;
          }
        });
    }

    return {
      selected,
      saveLocation,
      // symptoms
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

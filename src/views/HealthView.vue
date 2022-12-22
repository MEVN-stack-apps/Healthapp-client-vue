<template>
  <div>
    <h4>Health page</h4>
    <div>
      <h5>Select the Body location from below:</h5>
    </div>

    <form>
      <div
        v-for="location in $store.getters.locations"
        :key="location"
        :value="location"
        @change="saveLocation(location)"
      >
        <input type="radio" name="name" :id="location" :value="location" />
        <label for="name">{{ location.Name }}</label>
      </div>
    </form>

    <div v-if="$store.getters.location.Name">
      <p>
        The selected body location is:
        <strong>{{ $store.getters.location.Name }}</strong>
      </p>
      <h5>
        Select the symptoms on {{ $store.getters.location.Name }} from below:
      </h5>

      <div
        v-for="bodySymptoms in $store.getters.bodySymptoms"
        :key="bodySymptoms"
      >
        <ul>
          <li>{{ bodySymptoms?.Name }}</li>
        </ul>
      </div>

      <!-- <Multiselect v-model="symptoms" :options="$store.getters.bodySymptoms" /> -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
// import Multiselect from "@vueform/multiselect";

export default {
  components: {
    // Multiselect,
  },
  setup() {
    const store = useStore();
    const selected = ref("");
    const symptoms = ref("");

    store.dispatch("getLocations").then((data) => {
      if (data.err) {
        alert(data.err);
        return;
      }
    });

    let symptomsArray;
    function saveLocation(location) {
      store.dispatch("saveLocation", location).then((data) => {
        return data;
      });
      const locationId = store.getters.location.ID;
      const gender = store.getters.profile.gender;

      store
        .dispatch("getSymptomsByLocation", {
          locationId: locationId,
          gender: gender,
        })
        .then(async (data) => {
          if (data.bodySymptoms) {
            symptomsArray = await data.bodySymptoms.map((symptom) => {
              const ID = symptom.ID;
              const Name = symptom.Name;
              return { ID, Name };
            });

            return symptomsArray;
          } else {
            alert(data);
            return;
          }
        });
    }

    return {
      selected,
      saveLocation,
      symptomsArray,
      symptoms,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

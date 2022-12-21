<template>
  <div>
    <h4>Health page</h4>
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

    <p>The selected body location is: <strong>{{ selected.Name }}</strong></p>
    
  </div>
</template>

<script>
import { ref, } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const selected = ref('')

   
    store.dispatch('getLocations').then(data => {
      if (data.err) {
        alert(data.err);
        return;
      }
    });

    function saveLocation() {
      store.dispatch('saveLocation', selected.value).then(data => {
        return data
      });
    }
    

    return {
      selected,
      saveLocation
    }
    
  },
  methods: {
    
  }
}
</script>

<template>
  <div id="app">
    version :
    <p v-if="version">{{ version }}</p>
    <div v-if="updateExists">
      An update is available <span v-if="version">({{ version }})</span>
      <button @click="refreshApp">Update</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  name: 'App',
  components: {},
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
  created() {
    document.addEventListener('swUpdated', this.updateAvailable, { once: true });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // We'll also need to add 'refreshing' to our data originally set to false.
      if (this.refreshing) return;
      this.refreshing = true;
      // Here the actual reload of the page occurs
      window.location.reload();
    });
  },
  computed: {
    version() {
      return process.env.VUE_APP_VERSION;
    },
  },
  methods: {
    updateAvailable(event) {
      this.registration = event.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return;
      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

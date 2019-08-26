<template>
  <div id="app">
    <v-app>
      <NavBar />
      <router-view />
    </v-app>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss" scoped>
#app {
  background: #f0f4f4;
}
</style>


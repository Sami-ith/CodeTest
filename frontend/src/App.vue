<template>
  <v-app>
    <v-app-bar color="deep-purple" dark app >
    <v-toolbar-title>Code Test</v-toolbar-title>
  </v-app-bar>
    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>

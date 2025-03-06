<template>
  <html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <link href="/src/styles.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app">
    <AppMessages />
  </div>
  </body>
</html>
  
</template>

<script>
import AppMessages from './components/AppMessages.vue';

export default {
  name: 'App',
  components: {
    AppMessages
  }
};
</script>

<style>
/* Global styles for App.vue */
</style>

<template>
  <html lang="">
  <head>
    <title>CACA</title>
    <meta charset="UTF-8">
    <link rel="icon" href="../public/favicon.ico">
    <link href="/src/styles.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    AppMessages,
  }
};
</script>

<style>
/* Global styles for App.vue */
</style>

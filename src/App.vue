<script setup>

import NavBar from '@/components/NavBar.vue'
// since we used  router in main we dont need this anymore
// import MainPage from '@/components/MainPage.vue'


</script>


<template>

    <NavBar /> 

    <!-- Subsituting the mainPage with router -->
    <RouterView />
     <!--<MainPage />--> 
 



</template>
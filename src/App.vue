<script setup>
import { onMounted, ref } from 'vue';
import Alert from './modules/core/components/Alert.vue';
import { useAlertStore } from './stores/alert.store';

const alert = useAlertStore();

const deferredPrompt = ref(null) 
const installApp = ()=>{
  if(!deferredPrompt.value){
      return;
    }

    deferredPrompt.value.prompt();
    deferredPrompt.value.userChoice.then((choiceResult)=>{
      if(choiceResult.outcome === 'accepted'){
          deferredPrompt.value = null;
      }
    })
}



</script>

<template>
  
  <alert v-if="alert.isActive"></alert>
  <router-view></router-view>
</template>

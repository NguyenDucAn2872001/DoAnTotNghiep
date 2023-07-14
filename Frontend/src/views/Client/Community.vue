<template>
<div v-if="Loading==true" style="height: 100vh;display: flex;">
  <LoadingVue ></LoadingVue>
</div>
<div v-else>
  <HeaderView :data="getid" />
  <div style="padding-top: 80px;">
    <h1>
      hello
    </h1>
  </div>
</div>
</template>

<script setup>
import {ref ,onMounted} from 'vue'
import {useRoute} from 'vue-router'
import HeaderView from '../../components/HeaderView.vue'
import LoadingVue from "../../components/Loading.vue";

const Loading=ref(true)
const route=useRoute()
const getid=route.params.id

onMounted( async() => {
    setTimeout(function(){   
        Loading.value=false
    }, 1500);
})

</script>
<template>
  <HeaderView :data="getid" />
    <div style="padding-top: 80px;">
      <h1>
        hello
    </h1>
    </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import HeaderView from '../../components/HeaderView.vue'

const route=useRoute()
const getid=route.params.id

</script>
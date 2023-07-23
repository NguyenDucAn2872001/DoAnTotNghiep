<template>
    <div v-if="Loading==true" style="height: 100vh;display: flex;">
        <LoadingVue ></LoadingVue>
    </div>
    <div>
        <HeaderView :data="getid" style="z-index: 2;"/>
        <div style="padding-top: 80px;">
            <div>
                This is your profile
                <div>{{ info.email }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import LoadingVue from "../../components/Loading.vue";
import HeaderView from '../../components/HeaderView.vue'
import {useRoute} from 'vue-router'
import axios  from 'axios';

const Loading=ref(true)
const route=useRoute()
const getid=route.params.id 
const info = ref({
    email : "",
    password : "",
    name : "",
    username : "",
    studentCode : "",
    createdAt : null,
    avata : null,
    repeatPassword: "",

})
onMounted( async() => {
    setTimeout(function(){   
        Loading.value=false
    }, 1500);
    getUserById()
})

const getUserById = async()=>{
    try {
    await axios.get(import.meta.env.VITE_GET_USER_BY_ID,{params: {id:getid }}).then(response =>
    {
        console.log(response.data);
        info.value.email=response.data[0].email
        info.value.password=response.data[0].password
        info.value.name=response.data[0].name
        info.value.username=response.data[0].username
        info.value.studentCode=response.data[0].studentCode
        info.value.avata=response.data[0].avata
    
    })
    } catch (error) {console.log(error);}
}
</script>
<template>
    <div v-if="Loading==true" style="height: 100vh;display: flex;">
        <LoadingVue ></LoadingVue>
    </div>
    <div v-else class="d-flex" style="height: 100vh;">
        <div class="col-2 bg-light  border">
            <MenuBarAdmin/>
        </div>
        <div class="col-9">
            <HeaderAdmin/>
            <div class="demo-progress " style="padding-top: 80px;width: 100%;">
                <div class="d-flex justify-content-center mt-4 mb-5">
                    <h2>Quản lý tài liệu</h2>
                </div>
                <div style="width: 100%;">
                  
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import HeaderAdmin from '../../components/HeaderAdmin.vue'
import MenuBarAdmin from '../../components/MenuBarAdmin.vue'
import { ref, onMounted } from 'vue'
import LoadingVue from "../../components/Loading.vue";

const Loading=ref(true)
onMounted( async() => {
    setTimeout(function(){   
        Loading.value=false
    }, 1500); 
})


</script>
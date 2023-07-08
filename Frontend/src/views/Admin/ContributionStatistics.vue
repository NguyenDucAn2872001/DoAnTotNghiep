<template>
    <div class="d-flex" style="height: 100vh;">
        <div class="col-2 bg-light  border">
            <MenuBarAdmin/>
        </div>
        <div class="col-9">
            <HeaderAdmin/>
            <div class="demo-progress " style="padding-top: 80px;width: 100%;">
                <div class="d-flex justify-content-center mt-4 mb-5">
                    <h2 >Thống kê tài khoản</h2>
                </div>
                <div style="width: 100%;">
                    <div class="mb-5">
                        <div class="ms-3 fw-bold" @click="getRandomElement">Số lượng tài liệu : {{ NumberOdDocument }}</div>
                    </div>
                    <div style="width: 100%;">
                        <div style="width: 100%;display: flex;" v-for="i in ListContributionStatistics">
                            <div class="ms-3 fw-bold" style="width: 10%;">{{ i.name }}</div>
                            <div class="ms-3 fw-bold" style="width: 10%;">{{ i.document_count }}</div>
                            <el-progress :text-inside="true" :stroke-width="24" striped striped-flow :duration="30" :percentage="((i.document_count*100)/NumberOdDocument).toFixed(1)" :status="getRandomElement()" style="width: 80%;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted } from 'vue'
import axios  from 'axios';
import HeaderAdmin from '../../components/HeaderAdmin.vue'
import MenuBarAdmin from '../../components/MenuBarAdmin.vue'

const AdminAcc=ref({id:0,email:"admin@admin.com",username:"admin",name:'admin',password:"admin"})
const color=ref(["success","secondary","warning","danger"])
const NumberOdDocument=ref()
const ListContributionStatistics=ref([])
onMounted(()=>{
    GetNumberOfDocument()
    getContributionStatistics()
})

const GetNumberOfDocument = async()=>{
    try {
        await axios.get(import.meta.env.VITE_GET_NUMBER_OF_DOCUMENT,{
        }).then(response =>
        {
            NumberOdDocument.value = response.data[0].document_count
        })
    } catch (error) {
        console.log(error);
    }
}

const getRandomElement =()=> {
  if (color.value.length === 0) {
    return undefined;
  }
  
  const randomIndex = Math.floor(Math.random() * color.value.length);
  console.log(color.value[randomIndex]); 
  return color.value[randomIndex]
}

const getContributionStatistics =async()=>{
    try {
        await axios.get(import.meta.env.VITE_GET_CONTRIBUTION_STATISTICS,{
        }).then(response =>
        {
            for (let i = 0; i < response.data.length; i++) {
                ListContributionStatistics.value.push(response.data[i])      
            }
            console.log(ListContributionStatistics.value);
        })
    } catch (error) {
        console.log(error);
    }
}

</script>
  
<style scoped>
.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
}
</style>
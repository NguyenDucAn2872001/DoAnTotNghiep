<template>
<div v-if="Loading==true" style="height: 100vh;display: flex;">
  <LoadingVue ></LoadingVue>
</div>
<div v-else>
  <HeaderView :data="getid" style="z-index: 1;"/>
  <div class="d-flex align-items-center" style="padding-top: 80px;width: 100%;">
    <!-- <h1 v-for="i in PublicDocument">
      {{ i }}
    </h1> -->
    <div class="row justify-content-center" style="padding-top: 50px;">
      <div class="card col-3 mb-5" v-for="i in PublicDocument" @click="ViewDocument(i.id)" style="width: 280px;">
        <div class="d-flex align-items-center">
          <div class="text-reset me-3 button" style="display: flex;align-items: center;text-decoration: none ;cursor: pointer; width: 30px;height: 30px;">
            <i class="fa-solid fa-user bell text-light ms-1" style="font-size: 16px;"></i>        
          </div> 
          <div style="display: flex;">
            <p class="fw-bold mt-3 username">{{ i.username }}</p>
            <div class="me-2 ms-2 line" style="height:14px;width: 2px;margin-top: 20px;"></div>
            <p class="fw-bold mt-3 username">{{ i.studentCode }}</p>
          </div>
        </div>
        <div class="parent">
          <div class="card-title d-flex justify-content-center  child">{{ i.nameDocument }}</div>
        </div>
        <p class="username fw-bold mb-3 mt-4">Thể loại:{{ i.classify }}</p>
        <div class="like-dislike-container">
          <div class="icons-box">
            <div class="icons">
              <label class="like-label">12</label>
              <i class="fa-solid fa-thumbs-up svgs" id="icon-like" style="font-size: 20px;"></i>
            </div>
            <div class="icons">
              <i class="fa-solid fa-thumbs-up svgs" id="icon-dislike" style="font-size: 20px;"></i>
              <label class="dislike-label">3</label>
            </div>
          </div>
        </div>
        <div class="go-corner">
          <div class="go-arrow">→</div>
        </div>
      </div>
    </div>

    <!-- <div class="row justify-content-center" style="padding-top: 50px;">
      <div class="card col-3 mb-5" v-for="i in 5" style="width: 280px;">
        <div class="d-flex align-items-center">
          <div class="text-reset me-3 button" style="display: flex;align-items: center;text-decoration: none ;cursor: pointer; width: 30px;height: 30px;">
            <i class="fa-solid fa-user bell text-light ms-1" style="font-size: 16px;"></i>        
          </div> 
          <div style="display: flex;">
            <p class="fw-bold mt-3 username">Duc An</p>
            <div class="me-2 ms-2 line" style="height:14px;width: 2px;margin-top: 20px;"></div>
            <p class="fw-bold mt-3 username">20192675</p>
          </div>
        </div>
        <p class="card-title d-flex justify-content-center mb-5">Lý Thuyết Mạch</p>
        <p class="username fw-bold mb-5">Thể loại: Sách , Giáo Trình</p>
        <div class="like-dislike-container mb-3">
          <div class="icons-box">
            <div class="icons">
              <label class="like-label">12</label>
              <i class="fa-solid fa-thumbs-up svgs" id="icon-like" style="font-size: 20px;"></i>
            </div>
            <div class="icons">
              <i class="fa-solid fa-thumbs-up svgs" id="icon-dislike" style="font-size: 20px;"></i>
              <label class="dislike-label">3</label>
            </div>
          </div>
        </div>
        <div class="go-corner">
          <div class="go-arrow">→</div>
        </div>
      </div>
    </div> -->


  </div>
</div>
</template>

<script setup>
import {ref ,onMounted} from 'vue'
import axios  from 'axios';
import {useRoute} from 'vue-router'
import HeaderView from '../../components/HeaderView.vue'
import LoadingVue from "../../components/Loading.vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const Loading=ref(true)
const route=useRoute()
const getid=route.params.id
const PublicDocument=ref([])
onMounted( async() => {
  setTimeout(function(){   
      Loading.value=false
  }, 1500);
  getPublicDocument()
  console.log(typeof(getid));
})

const getPublicDocument = async(from1,to1)=>{
  PublicDocument.value=[]
  try {
    await axios.get(import.meta.env.VITE_GET_PUBLIC_DOCUMENT,{params: {to1: to1, from1: from1 }}).then(response =>
    {for (let i = 0; i < response.data.length; i++) {
      PublicDocument.value.push(response.data[i])
    }})
  } catch (error) {console.log(error);}
}
const ViewDocument=async(id)=>{
  Loading.value=true
  setTimeout(function(){   
      Loading.value=false
      return router.push({ name: 'ViewDocument', query: { id, getid } });
  }, 1500);
  console.log(id);
  
}
</script>
<style scoped>
.parent {
  height: 60px; 
  overflow: auto; 
}

.child {
  height: auto; 
  width: 250px;
}

.card-title {
  color: #262626;
  font-size: 1.5em;
  line-height: normal;
  font-weight: 700;
  margin-bottom: 0.5em;
}

.small-desc {
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5em;
  color: #452c2c;
}

.small-desc {
  font-size: 1em;
}

.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 2em;
  height: 2em;
  overflow: hidden;
  top: 0;
  right: 0;
  background: #FF4040;
  border-radius: 0 4px 0 32px;
}

.go-arrow {
  margin-top: -4px;
  margin-right: -4px;
  color: white;
  font-family: courier, sans;
}

.card {
  display: block;
  position: relative;
  max-width: 300px;
  max-height: 320px;
  background-color: #f2f8f9;
  border-radius: 10px;
  padding: 2em 1.2em;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
  font-family: Arial, Helvetica, sans-serif;
}

.card:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: linear-gradient(135deg, #364a60, #384c6c);
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.35s ease-out;
}

.card:hover:before {
  transform: scale(28);
}
.line{
  background-color: #000000;
}
.card:hover .small-desc {
  transition: all 0.5s ease-out;
  color: rgba(255, 255, 255, 0.8);
}

.card:hover .card-title {
  transition: all 0.5s ease-out;
  color: #ffffff;
}

.card:hover .username {
  transition: all 0.5s ease-out;
  color: #ffffff;
}
.card:hover .line {
  transition: all 0.5s ease-out;
  background-color: #ffffff;
}
.card:hover #icon-like {
  transition: all 0.5s ease-out;
  color: #ffffff;
}
.card:hover #icon-dislike{
  transition: all 0.5s ease-out;
  color: #ffffff;
}

.card:hover .dislike-label{
  transition: all 0.5s ease-out;
  color: #ffffff;
}
.card:hover .like-label{
  transition: all 0.5s ease-out;
  color: #ffffff;
}

.like-dislike-container {
  height: 60px;
    --dark-grey: #353535;
    --middle-grey: #767676;
    --lightest-grey: linear-gradient(#fafafa,#ebebeb);
    --shadow: 0 5px 15px 0 #00000026;
    --shadow-active: 0 5px 5px 0 #00000026;
    --border-radius-main: 10px;
    --border-radius-icon: 50px;
    position: relative;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    cursor: default;
    color: var(--dark-grey);
    opacity: .9;
    /* margin: auto; */
    padding: 0.5rem;
    font-weight: 600;
    /* background: var(--lightest-grey); */
    max-width: 30rem;
    border-radius: var(--border-radius-main);
    -webkit-border-radius: var(--border-radius-main);
    -moz-border-radius: var(--border-radius-main);
    -ms-border-radius: var(--border-radius-main);
    -o-border-radius: var(--border-radius-main);
    box-shadow: var(--shadow);
    -moz-box-shadow: var(--shadow);
    -webkit-box-shadow: var(--shadow);
    transition: .2s ease all;
    -webkit-transition: .2s ease all;
    -moz-transition: .2s ease all;
    -ms-transition: .2s ease all;
    -o-transition: .2s ease all;
}

.like-dislike-container:hover {
  box-shadow: var(--shadow-active);
  -moz-box-shadow: var(--shadow-active);
  -webkit-box-shadow: var(--shadow-active);
}

.like-dislike-container .tool-box {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  top: 0;
  right: 0;
  border-radius: var(--border-radius-main);
  -webkit-border-radius: var(--border-radius-main);
  -moz-border-radius: var(--border-radius-main);
  -ms-border-radius: var(--border-radius-main);
  -o-border-radius: var(--border-radius-main);
}

.like-dislike-container .btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: .8rem;
  height: .8rem;
  color: transparent;
  font-size: 0;
  cursor: pointer;
  background-color: #ff000080;
  border: none;
  border-radius: var(--border-radius-main);
  -webkit-border-radius: var(--border-radius-main);
  -moz-border-radius: var(--border-radius-main);
  -ms-border-radius: var(--border-radius-main);
  -o-border-radius: var(--border-radius-main);
  transition: .2s ease all;
  -webkit-transition: .2s ease all;
  -moz-transition: .2s ease all;
  -ms-transition: .2s ease all;
  -o-transition: .2s ease all;
}

.like-dislike-container .btn-close:hover {
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: #ff0000cc;
  box-shadow: var(--shadow-active);
  -moz-box-shadow: var(--shadow-active);
  -webkit-box-shadow: var(--shadow-active);
}

.like-dislike-container .btn-close:active {
  width: .9rem;
  height: .9rem;
  font-size: .9rem;
  color: #ffffffde;
  --shadow-btn-close: 0 3px 3px 0 #00000026;
  box-shadow: var(--shadow-btn-close);
  -moz-box-shadow: var(--shadow-btn-close);
  -webkit-box-shadow: var(--shadow-btn-close);
}

.like-dislike-container .text-content {
  margin-bottom: 1rem;
  font-size: 18px;
  line-height: 1.6;
  cursor: default;
}

.like-dislike-container .icons-box {
  display: flex;
}

.like-dislike-container .icons {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: .6;
  margin: 0 0.5rem;
  padding: 0 0.5rem;
  cursor: pointer;
  border: 1px solid var(--middle-grey);
  border-radius: var(--border-radius-icon);
  -webkit-border-radius: var(--border-radius-icon);
  -moz-border-radius: var(--border-radius-icon);
  transition: .2s ease all;
  -webkit-transition: .2s ease all;
  -moz-transition: .2s ease all;
  -ms-transition: .2s ease all;
  -o-transition: .2s ease all;
}

.like-dislike-container .icons:hover {
  opacity: .9;
  /* background-color: #fff; */
  box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  -webkit-box-shadow: var(--shadow);
  
}

.like-dislike-container .icons:active {
  opacity: .9;
  box-shadow: var(--shadow-active);
  -moz-box-shadow: var(--shadow-active);
  -webkit-box-shadow: var(--shadow-active);
}

.like-dislike-container .like-label {
  border-right: 0.1rem solid var(--dark-grey);
  padding: 0 0.6rem 0 0.5rem;
  pointer-events: none;
}

.like-dislike-container .dislike-label {
  border-left: 0.1rem solid var(--dark-grey);
  padding: 0 0.5rem 0 0.6rem;
  pointer-events: none;
}

.like-dislike-container .icons .svgs {
  width: 1.3rem;
  fill: #000000;
  box-sizing: content-box;
  padding: 10px 10px;
  transition: .2s ease all;
  -webkit-transition: .2s ease all;
  -moz-transition: .2s ease all;
  -ms-transition: .2s ease all;
  -o-transition: .2s ease all;
}

.like-dislike-container .icons:hover #icon-like {
  animation: rotate-icon-like 0.7s ease-in-out both;
}

.like-dislike-container .icons #icon-dislike {
  transform: rotate(180deg);
}

.like-dislike-container .icons:hover #icon-dislike {
  color: #fff;
  animation: rotate-icon-dislike 0.7s ease-in-out both;
}

/* Shake Animation */
@keyframes rotate-icon-like {
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }

  25% {
    transform: rotate(3deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(-3deg) translate3d(0, 0, 0);
  }

  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }

  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}

@keyframes rotate-icon-dislike {
  0% {
    transform: rotate(180deg) translate3d(0, 0, 0);
  }

  25% {
    transform: rotate(183deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(177deg) translate3d(0, 0, 0);
  }

  75% {
    transform: rotate(181deg) translate3d(0, 0, 0);
  }

  100% {
    transform: rotate(180deg) translate3d(0, 0, 0);
  }
}

</style>
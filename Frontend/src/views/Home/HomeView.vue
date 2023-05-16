<template>
  <div style="display: flex;width: 100%;background-color: #F8F8FF;">
    <div class="right" style="width: 80%;">
      <div class="">
        <nav class="navbar navbar-expand-lg navbar-light " style="background-color: #CCCCCC;">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <a class="navbar-brand mt-2 mt-lg-0 me-5" href="#">
                <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="15" alt="MDB Logo" loading="lazy"/>
              </a>
              <div style="display: flex;align-items: center;text-decoration: none ;cursor: pointer;">
                <i class="fa-solid fa-user" style="padding-right: 10px;"></i>
                <div style="font-weight: 700;">{{ name }}</div>
              </div>  
            </div>  
            <div class="d-flex align-items-center">
              <div class="text-reset me-5 " href="#" style="cursor: pointer;" @click="dropdown=!dropdown">
                <i class="fa-regular fa-comments"></i>
                <span class="badge rounded-pill badge-notification bg-danger">1</span>    
              </div>
              <div class="dropdown me-5" style="cursor: pointer; " @click="dropdownRp=!dropdownRp">
                <i class="fas fa-bell"></i>
                <span class="badge rounded-pill badge-notification bg-danger">1</span>    
              </div>
              
            </div>
          </div>
        </nav>
      </div>
      <div class="footer">
        <div v-if="dropdown==true" class="dropdown-message" >
          <i class="fa-solid fa-circle-xmark icon-close" @click="dropdown=!dropdown"></i>
          <div class="message">Chat </div>
          <div class="input-group search-box" >
            <input class="form-control border-end-0 border" type="search" placeholder="search" id="example-search-input" style="border-radius: 18px;">
            <i class="fa fa-search icon-search"></i>
          </div>
          <div class="scroll-snap">
            <div v-for="i in infoUser" class="list-message" @click="chat()">
              <i class="fa-solid fa-circle-user icon-users" style="cursor: pointer;"></i>
              <label for="" style="font-weight: 700;cursor: pointer;">{{ i }}</label>
            </div>
          </div>
          
        </div>
        <div v-if="dropdownRp==true " class="dropdown-message " >
          <i class="fa-solid fa-circle-xmark icon-close" @click="dropdownRp=!dropdownRp"></i>
          <div class="message">Thông báo </div>
          
        </div>
        <div v-if="openchat==true " class="message-user" >
          <div style="position: relative; height: 100%;">
            <i class="fa-solid fa-circle-xmark icon-close" @click="openchat=!openchat"></i>
            <div style="height: 50px;display: flex;align-items: center;padding: 10px;">
              <i class="fa-solid fa-circle-user icon-users" style="cursor: pointer;"></i>
              <label for="" style="font-weight: 700;cursor: pointer;">Nguyen Duc An</label>
            </div>
            <div class="line-1"></div>
            <div class="scroll-snap" >
              <div class="guest-message"  >Hello </div>
              <div class="guest-message" >how are you doing </div>
              <div class="you-message" >I'm fine, how about you?</div>
              <div class="guest-message"  >Hello </div>
              <div class="guest-message">how are you doing </div>
              <div class="you-message"  >I'm fine, how about you?</div>
              <div class="guest-message"  >Hello </div>
              <div class="guest-message" >how are you doing </div>
              <div class="you-message" >I'm fine, how about you?</div>
              <div class="guest-message"  >Hello </div>
              <div class="guest-message">how are you doing </div>
              <div class="you-message"  >I'm fine, how about you?</div>
            </div>
            
            <div class="form-outline send-message">
              <input type="email" id="typeEmail" class="form-control " placeholder="input message" style="border-radius: 20px;margin-right: 10px;"/>
              <i class="fa-regular fa-paper-plane" style="padding-top: 10px;cursor: pointer;"></i>
            </div>
          </div>
        </div>
        <router-link to="/Home/EditDocument"  style="text-decoration: none;z-index: 1;">
            <div class="text-danger ">Chỉnh sửa văn bản</div>
        </router-link>
      </div>
    </div>
    <div class="left" style="width: 20%; background-color: #AAAAAA;height: 739px; position: relative;">
      <div class="line"></div>
      <div @click="CheckOut" class="log-out" > 
        <router-link to="/"  style="display: flex;align-items: center;text-decoration: none ;color: black;" >
          <div style="padding-right: 20px;font-weight: 700;">Log out</div>
          <i class="fa-solid fa-right-from-bracket"></i>
        </router-link>  
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted,ref } from 'vue';
import axios  from 'axios';
import {useRoute} from 'vue-router'

const route=useRoute()
const dropdown=ref(false)
const dropdownRp=ref(false)
const openchat=ref(false)
const getid=route.params.id
const name=ref('')
const infoUser=ref([])
onMounted(()=>{
  console.log(getid);
  getInfoUser()
  CheckState()
})

const chat=()=>{
  dropdown.value=!dropdown.value
  openchat.value=!openchat.value
}

const getInfoUser = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GETAPI_USER).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].id==getid){
          name.value=response.data[i].name
        }
      }
      for (let i = 0; i < response.data.length; i++) {
        infoUser.value.push(response.data[i].name)
      }
    })
  } catch (error) {
      console.log(error);
  }
}

const CheckState = async()=>{
  try {
    await axios.post('http://localhost:8888/users/state',{
        id:localStorage.getItem('iduser')
    }
    ).then(response =>{
    })
  } 
  catch (error) {
    console.log("error");
  }
}

const CheckOut = async()=>{
  try {
    await axios.post('http://localhost:8888/users/stateout',{
        id:getid
    }
    ).then(response =>{
    })
  } 
  catch (error) {
    console.log("error");
  }
}
</script>

<style >
  .footer{
    position: relative;
  }
  .dropdown-message{
    top: 4px;
    right: 10px;
    position: absolute;
    width: 280px;
    height: 370px;
    background-color: #fff;
    border-radius: 20px;
    z-index: 2;
    border: 1px solid #C0C0C0;
  }
  .search-box{
    position: relative;
    border-radius: 18px;
    border: 1px solid #C0C0C0;
    margin-left: 10px;
    width: 238px;
  }
  .icon-search{
    position: absolute;
    right: 10px;
    top: 11px;
  }
  .message{
    padding: 10px;
    font-weight: 700;
    font-size: 21px;
  }
  .list-message{
    padding-left: 10px; 
    padding-top: 16px; 
    display: flex; 
    align-items: center;
    scroll-snap-align: start;
  }
  .icon-users{
    font-size: 36px; 
    color: #CCCCCC;
    padding-right: 10px;
  }
  .log-out{
    position: absolute; 
    bottom: 12px; 
    left: 178px;
  }
  .line{
    position: absolute; 
    bottom: 50px; 
    width: 100%;
    height: 2px;
    background-color: #fff;
  }
  .line-1{
    width: 100%;
    height: 2px;
    background-color: #CCCCCC;
  }
  .message-user{
    top: 4px;
    right: 10px;
    position: absolute;
    width: 280px;
    height: 370px;
    background-color: #fff;
    border-radius: 20px;
    z-index: 2;
    border: 1px solid #C0C0C0;
  }
  .icon-close{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .guest-message{
    padding: 10px;
    background-color: #EEEEEE; 
    width: 70%;
    border-radius: 20px;
    color: #000; 
    font-weight: 700; 
    margin: 10px;
    scroll-snap-align: start;
  }
  .you-message{
    padding: 10px;
    background-color: #0066FF; 
    width: 70%;
    border-radius: 20px;
    color: #fff; 
    font-weight: 700;
    margin-top: 10px; 
    margin-left: 72px;
    scroll-snap-align: start;
  }
  .send-message{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    display: flex;
  }
  .scroll-snap{
    width: 100%;
    height: 68%;
    display: flex;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    flex-direction: column;
  }
</style>
















<!-- <template>
    <div>
        <HeaderView  />
        <div ref="de_titlebar" id="documenteditor_titlebar" class="e-de-ctn-title">
            <div v-on:keydown="titleBarKeydownEvent" v-on:click="titleBarClickEvent" class="single-line"
                id="documenteditor_title_contentEditor" title="Document Name. Click or tap to rename this document."
                contenteditable="false">
                <label v-on:blur="titleBarBlurEvent" id="documenteditor_title_name" :style="titileStyle">{{documentName}}</label>
            </div>
            <ButtonComponent id="de-print" :style="iconStyle" :iconCss="printIconCss" v-on:click="printBtnClick" style="float: none;"
                title="Print this document (Ctrl+P).">Print</ButtonComponent>
            <DropDownButtonComponent ref="de-export" :style="iconStyle" :items="exportItems" :iconCss="exportIconCss"
                cssClass="e-caret-hide" content="Download" v-bind:select="onExport" :open="openExportDropDown"
                title="Download this document.">
            </DropDownButtonComponent>
        </div>
        <div class="e-de-tlbr-wrapper">
      <div class="e-de-toolbar e-control e-toolbar e-lib e-keyboard" role="toolbar" aria-disabled="false" aria-orientation="horizontal" style="height: auto; width: auto;">
        <div class="e-toolbar-items">
          <div class="e-toolbar-item e-de-toolbar-btn-start" aria-label="Create a new document." title="Create a new document.">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_new" tabindex="0" data-tabindex="-1" aria-label="New" aria-disabled="false" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-new e-icons e-icon-left">

              </span>
              <span class="e-tbar-btn-text">New</span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-toolbar-btn-last" aria-label="Open a document." title="Open a document.">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" @click="openBtnClick" type="button" id="container_toolbar_open" tabindex="-1" data-tabindex="-1" aria-label="Open" aria-disabled="false" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-open e-icons e-icon-left"></span>
              <span class="e-tbar-btn-text">Open</span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-separator e-separator"></div>
          <div class="e-toolbar-item e-de-toolbar-btn-first e-overlay" aria-label="Undo the last operation (Ctrl+Z)." title="Undo the last operation (Ctrl+Z).">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_undo" tabindex="-1" data-tabindex="-1" aria-label="Undo" aria-disabled="true" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-undo e-icons e-icon-left"></span>
              <span class="e-tbar-btn-text">Undo</span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-toolbar-btn-last e-overlay" aria-label="Redo the last operation (Ctrl+Y)." title="Redo the last operation (Ctrl+Y).">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_redo" tabindex="-1" data-tabindex="-1" aria-label="Redo" aria-disabled="true" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-redo e-icons e-icon-left"></span>
              <span class="e-tbar-btn-text">Redo</span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-separator e-separator"></div>
          <div class="e-toolbar-item e-template" aria-label="Insert inline picture from a file." aria-haspopup="false">
            <button title="Insert inline picture from a file." class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-de-toolbar-btn-first e-caret-hide" type="button" id="container_toolbar_image" aria-haspopup="true" aria-expanded="false" aria-label="Image" aria-disabled="false">
              <span class="e-btn-icon e-icons e-de-ctnr-image e-icon-left"></span>
              <span class="e-tbar-btn-text">Image</span>
              <span class="e-btn-icon e-icons e-icon-right e-caret"></span>
              <span class="e-btn-icon e-icons e-icon-right e-caret"></span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-toolbar-btn-middle" aria-label="Insert a table into the document" aria-haspopup="true" title="Insert a table into the document">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_table" tabindex="-1" data-tabindex="-1" aria-label="Table" aria-disabled="false" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-table e-icons e-icon-left"></span><span class="e-tbar-btn-text">Table</span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-toolbar-btn-middle" aria-label="Create a link in your document for quick access to web pages and files (Ctrl+K)." aria-haspopup="true" title="Create a link in your document for quick access to web pages and files (Ctrl+K).">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_link" tabindex="-1" data-tabindex="-1" aria-label="Link" aria-disabled="false" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-link e-icons e-icon-left"></span>
              <span class="e-tbar-btn-text">Link</span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-toolbar-btn-middle" aria-label="Insert a bookmark in a specific place in this document." aria-haspopup="true" title="Insert a bookmark in a specific place in this document.">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_bookmark" tabindex="-1" data-tabindex="-1" aria-label="Bookmark" aria-disabled="false" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-bookmark e-icons e-icon-left"></span>
              <span class="e-tbar-btn-text">Bookmark</span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-toolbar-btn-last" aria-label="Table of Contents" title="Provide an overview of your document by adding a table of contents.">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_toc" tabindex="-1" data-tabindex="-1" aria-label="Table of<div class=&quot;e-de-text-wrap&quot;> Contents</div>" aria-disabled="false" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-tableofcontent e-icons e-icon-left"></span>
              <span class="e-tbar-btn-text">Table of<div class="e-de-text-wrap"> Contents</div></span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-separator e-separator"></div>
          <div class="e-toolbar-item e-de-toolbar-btn-first" aria-label="Add or edit the header." title="Add or edit the header.">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_header" tabindex="-1" data-tabindex="-1" aria-label="Header" aria-disabled="false" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-header e-icons e-icon-left"></span>
              <span class="e-tbar-btn-text">Header</span>
            </button>
          </div>
          <div class="e-toolbar-item e-de-toolbar-btn-middle" aria-label="Add or edit the footer." title="Add or edit the footer.">
            <button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_footer" tabindex="-1" data-tabindex="-1" aria-label="Footer" aria-disabled="false" style="width: auto;">
              <span class="e-btn-icon e-de-ctnr-footer e-icons e-icon-left"></span><span class="e-tbar-btn-text">Footer</span></button></div><div class="e-toolbar-item e-template" aria-label="Page Setup"><button title="Page Setup" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-caret-hide e-de-toolbar-btn-first" type="button" id="container_toolbar_page_setup" aria-haspopup="true" aria-expanded="false" aria-label="Page Setup" aria-disabled="false"><span class="e-btn-icon e-icons e-de-ctnr-pagesetup e-icon-left"></span><span class="e-tbar-btn-text">Page<div class="e-de-text-wrap"> Setup</div></span><span class="e-btn-icon e-icons e-icon-right e-caret"></span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button></div><div class="e-toolbar-item e-de-toolbar-btn-middle" aria-label="Page Number" title="Add page numbers."><button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_page_number" tabindex="-1" data-tabindex="-1" aria-label="Page<div class=&quot;e-de-text-wrap&quot;> Number</div>" aria-disabled="false" style="width: auto;"><span class="e-btn-icon e-de-ctnr-pagenumber e-icons e-icon-left"></span><span class="e-tbar-btn-text">Page<div class="e-de-text-wrap"> Number</div></span></button></div><div class="e-toolbar-item e-template" aria-label="Break"><button title="Break" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-caret-hide" type="button" id="container_toolbar_break" aria-haspopup="true" aria-expanded="false" aria-label="Break" aria-disabled="false"><span class="e-btn-icon e-icons e-de-ctnr-break e-icon-left"></span><span class="e-tbar-btn-text">Break</span><span class="e-btn-icon e-icons e-icon-right e-caret"></span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button></div><div class="e-toolbar-item e-de-toolbar-btn-middle" aria-label="Insert Footnote" title="Insert Footnote (Alt+Ctrl+F)."><button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_footnote" tabindex="-1" data-tabindex="-1" aria-label="Insert<div class=&quot;e-de-text-wrap&quot;> Footnote</div>" aria-disabled="false" style="width: auto;"><span class="e-btn-icon e-de-footnote e-icons e-icon-left"></span><span class="e-tbar-btn-text">Insert<div class="e-de-text-wrap"> Footnote</div></span></button></div><div class="e-toolbar-item e-de-toolbar-btn-last" aria-label="Insert Endnote" title="Insert Endnote (Alt+Ctrl+D)."><button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_endnote" tabindex="-1" data-tabindex="-1" aria-label="Insert<div class=&quot;e-de-text-wrap&quot;> Endnote</div>" aria-disabled="false" style="width: auto;"><span class="e-btn-icon e-de-endnote e-icons e-icon-left"></span><span class="e-tbar-btn-text">Insert<div class="e-de-text-wrap"> Endnote</div></span></button></div><div class="e-toolbar-item e-de-separator e-separator"></div><div class="e-toolbar-item e-de-toolbar-btn" aria-label="Find text in the document (Ctrl+F)." title="Find text in the document (Ctrl+F)."><button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_find" tabindex="-1" data-tabindex="-1" aria-label="Find" aria-disabled="false" style="width: auto;"><span class="e-btn-icon e-de-ctnr-find e-icons e-icon-left"></span><span class="e-tbar-btn-text">Find</span></button></div><div class="e-toolbar-item e-de-separator e-separator"></div><div class="e-toolbar-item e-de-toolbar-btn-first" aria-label=""><button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_comment" tabindex="-1" data-tabindex="-1" aria-label="Comments" aria-disabled="false" style="width: auto;"><span class="e-btn-icon e-de-cnt-cmt-add e-icons e-icon-left"></span><span class="e-tbar-btn-text">Comments</span></button></div><div class="e-toolbar-item e-de-toolbar-btn-last" aria-label="Track Changes" aria-pressed="false" role="button" title="Keep track of the changes made in the document"><button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_track" tabindex="-1" data-tabindex="-1" aria-label="Track<div class=&quot;e-de-text-wrap&quot;> Changes</div>" aria-disabled="false" style="width: auto;" aria-pressed="false"><span class="e-btn-icon e-de-cnt-track e-icons e-icon-left"></span><span class="e-tbar-btn-text">Track<div class="e-de-text-wrap"> Changes</div></span></button></div><div class="e-toolbar-item e-de-separator e-separator"></div><div class="e-toolbar-item e-de-toolbar-btn-first" aria-label="Local Clipboard" aria-pressed="false" role="button" title="Toggle between the internal clipboard and system clipboard.Access to system clipboard through script is denied due to browsers security policy. Instead,  1. You can enable internal clipboard to cut, copy and paste within the component. 2. You can use the keyboard shortcuts (Ctrl+X, Ctrl+C and Ctrl+V) to cut, copy and paste with system clipboard."><button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_use_local_clipboard" tabindex="-1" data-tabindex="-1" aria-label="Local<div class=&quot;e-de-text-wrap&quot;> Clipboard</div>" aria-disabled="false" style="width: auto;" aria-pressed="false"><span class="e-btn-icon e-de-ctnr-paste e-icons e-icon-left"></span><span class="e-tbar-btn-text">Local<div class="e-de-text-wrap"> Clipboard</div></span></button></div><div class="e-toolbar-item e-template" aria-label=""><button title="" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-de-toolbar-btn-first e-caret-hide" type="button" id="container_toolbar_restrict_edit" aria-pressed="false" aria-haspopup="true" aria-expanded="false" aria-label="Restrict Editing"><span class="e-btn-icon e-de-ctnr-lock e-icons e-icon-left"></span><span class="e-tbar-btn-text">Restrict<div class="e-de-text-wrap"> Editing</div></span><span class="e-btn-icon e-icons e-icon-right e-caret"></span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button></div><div class="e-toolbar-item e-de-separator e-separator"></div><div class="e-toolbar-item e-template" aria-label="Form Fields"><button title="Form Fields" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-dropdown-btn e-de-toolbar-btn-first e-caret-hide" type="button" id="container_toolbar_form_fields" aria-haspopup="true" aria-expanded="false" aria-label="Form Fields" aria-disabled="false"><span class="e-btn-icon e-de-formfield e-icons e-icon-left"></span><span class="e-tbar-btn-text">Form<div class="e-de-text-wrap"> Fields</div></span><span class="e-btn-icon e-icons e-icon-right e-caret"></span><span class="e-btn-icon e-icons e-icon-right e-caret"></span></button></div><div class="e-toolbar-item e-de-toolbar-btn-end e-de-formfields" aria-label="Update cross reference fields" title="Update cross reference fields"><button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="container_toolbar_update_fields" tabindex="-1" data-tabindex="-1" aria-label="Update<div class=&quot;e-de-text-wrap&quot;> Fields</div>" aria-disabled="false" style="width: auto;"><span class="e-btn-icon e-de-update-field e-icons e-icon-left"></span><span class="e-tbar-btn-text">Update<div class="e-de-text-wrap"> Fields</div></span></button></div></div></div></div>
        <DocumentEditorContainerComponent id='container' ref="doceditcontainer" :enableToolbar='true' height="590px"
        :serviceUrl='serviceUrl'></DocumentEditorContainerComponent>
    </div>
</template>
<script setup>
  import HeaderView from '../../components/HeaderView.vue';
  import {DocumentEditorContainerComponent,Toolbar} from '@syncfusion/ej2-vue-documenteditor';
  import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
  import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
  import{ref,nextTick} from 'vue'
  
  const uploadDocument=ref()
  const de_titlebar=ref()
  const doceditcontainer =ref()
  const serviceUrl='https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'
  const documentName= 'Getting Started'
  const documentTitle= ref('Untitled Document')
  const iconStyle='float:right;background: transparent;box-shadow:none;border-color: transparent;border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;font-family:inherit;'
  const titileStyle='text-transform:capitalize;font-weight:400;font-family:inherit;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text'
  const printIconCss= 'e-de-icon-Print e-de-padding-right'
  const exportIconCss= 'e-de-icon-Download e-de-padding-right'
  const exportItems= [
    {
      text: 'Microsoft Word (.docx)',
      id: 'word'
    },
    { 
      text: 'Syncfusion Document Text (.sfdt)',
      id: 'sfdt' 
    }]

  const DocumentEditorContainer= [Toolbar]

  const onExport =function (args) {
    switch (args.item.id) {
      case 'word':
        save('Docx');
        console.log("1");
        break;
      case 'sfdt':
        save('Sfdt');
        console.log("2");
        break;       
    }
  }

  const openExportDropDown= function () {
    console.log("3");
    document.getElementById('word').setAttribute('title','Download a copy of this document to your computer as a DOCX file.');
    document.getElementById('sfdt').setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
  }
  const save= function (format) {
    console.log("4");
    doceditcontainer.value.ej2Instances.documentEditor.save( doceditcontainer.value.ej2Instances.documentEditor.documentName == '' ? 'sample' :  this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName, format);
  }
  const openBtnClick= function () {
    console.log("5");
    uploadDocument.value.click();
  }
  const printBtnClick= function () {
    console.log("6");
    doceditcontainer.value.ej2Instances.documentEditor.print();
  }
  const titleBarKeydownEvent= function (e) {
    console.log("7");
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById("documenteditor_title_contentEditor").contentEditable = 'false';
      if (document.getElementById("documenteditor_title_contentEditor").textContent === '') {
          document.getElementById("documenteditor_title_contentEditor").textContent = 'Document1';
      }
    }
  }
  const titleBarBlurEvent = function () {
    console.log("8");
    if (document.getElementById("documenteditor_title_contentEditor").textContent === '') {
      document.getElementById("documenteditor_title_contentEditor").textContent = 'Document1';
    }
    document.getElementById("documenteditor_title_contentEditor").contentEditable = 'false';
    doceditcontainer.value.ej2Instances.documentEditor.documentName = document.getElementById("documenteditor_title_name").textContent;
  }
  const titleBarClickEvent=function () {
    console.log("9");
    updateDocumentEditorTitle();
  }
  const updateDocumentEditorTitle =function () {
    console.log("10");
    document.getElementById("documenteditor_title_contentEditor").contentEditable = 'true';
    document.getElementById("documenteditor_title_contentEditor").focus();
    window.getSelection().selectAllChildren(document.getElementById("documenteditor_title_contentEditor"));
  }
  const documentChangedEvent= function () {
    console.log("11");
    var obj = doceditcontainer.value.ej2Instances.documentEditor;
    documentTitle.value = obj.documentName === '' ? 'Untitled Document' : obj.documentName;
    document.getElementById("documenteditor_title_name").textContent = obj.documentName ;
    setTimeout(() => { obj.scrollToPage(1); }, 10);
  }
  const updateDocumentEditorSize= function () {
    console.log("12");
    var windowWidth = window.innerWidth -18;
    var windowHeight = window.innerHeight - (document.getElementById("documenteditor_titlebar").offsetHeight +26);
    doceditcontainer.value.ej2Instances.resize(windowWidth, windowHeight);
    
  }
  const onWindowResize= function () {
    console.log("13");
    updateDocumentEditorSize();
  }
  const openTemplate=function () {
    console.log("14");
    var uploadDocument = new FormData();
    uploadDocument.append('DocumentName', 'Getting Started.docx');
    var loadDocumentUrl =
    doceditcontainer.value.ej2Instances.serviceUrl + 'LoadDocument';
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', loadDocumentUrl, true);
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200 || httpRequest.status === 304) {
          doceditcontainer.value.ej2Instances.documentEditor.open(
            httpRequest.responseText
          );
        }
      }
    };
    httpRequest.send(uploadDocument);
  }  
  nextTick( ()=> {
    doceditcontainer.value.ej2Instances.locale = 'en-US';
    doceditcontainer.value.ej2Instances.serviceUrl = serviceUrl;
    doceditcontainer.value.ej2Instances.documentChange = () => {
      documentChangedEvent();
    };
    setTimeout(() => {
      updateDocumentEditorSize();
    }, 100);
    window.addEventListener('resize', onWindowResize);
    openTemplate();
  });

</script>
<style >
  @import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-lists/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-vue-splitbuttons/styles/material.css';
  .e-bn{
    float: none;
  }
</style> -->

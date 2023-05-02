<template>
    <div>
        <div ref="de_titlebar" id="documenteditor_titlebar" class="e-de-ctn-title">
            <div v-on:keydown="titleBarKeydownEvent" v-on:click="titleBarClickEvent" class="single-line"
                id="documenteditor_title_contentEditor" title="Document Name. Click or tap to rename this document."
                contenteditable="false">
                <label v-on:blur="titleBarBlurEvent" id="documenteditor_title_name" :style="titileStyle">{{documentName}}</label>
            </div>
            <ejs-button id="de-print" :style="iconStyle" :iconCss="printIconCss" v-on:click="printBtnClick" style="float: none;"
                title="Print this document (Ctrl+P).">Print</ejs-button>
            <ejs-dropdownbutton ref="de-export" :style="iconStyle" :items="exportItems" :iconCss="exportIconCss"
                cssClass="e-caret-hide" content="Download" v-bind:select="onExport" :open="openExportDropDown"
                title="Download this document.">
            </ejs-dropdownbutton>
        </div>
        <ejs-documenteditorcontainer id='container' ref="doceditcontainer" :enableToolbar='true' height="590px"
        :serviceUrl='serviceUrl'></ejs-documenteditorcontainer>
    </div>
</template>
<script >
  import {DocumentEditorContainerComponent,Toolbar} from '@syncfusion/ej2-vue-documenteditor';
  import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
  import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
  
  //Component registeration
  export default {
    components: {
      // Declaring component
      'ejs-documenteditorcontainer': DocumentEditorContainerComponent,
      'ejs-button': ButtonComponent,
      'ejs-dropdownbutton': DropDownButtonComponent,
    },
    data() {
      return {
        serviceUrl:
          'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/',
        documentName: 'Getting Started',
        documentTitle: 'Untitled Document',
        iconStyle:
          'float:right;background: transparent;box-shadow:none;border-color: transparent;border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;font-family:inherit;',
        titileStyle:
          'text-transform:capitalize;font-weight:400;font-family:inherit;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text',
        printIconCss: 'e-de-icon-Print e-de-padding-right',
        exportIconCss: 'e-de-icon-Download e-de-padding-right',
        exportItems: [
          { text: 'Microsoft Word (.docx)', id: 'word' },
          { text: 'Syncfusion Document Text (.sfdt)', id: 'sfdt' },
        ],
      };
    },
    provide: {
      DocumentEditorContainer: [Toolbar],
    },
    methods: {
      onExport: function (args) {
        switch (args.item.id) {
          case 'word':
            this.save('Docx');
            console.log("1");
            break;
          case 'sfdt':
            this.save('Sfdt');
            console.log("2");
            break;
            
        }
      },
      openExportDropDown: function () {
        console.log("3");
        document.getElementById('word').setAttribute('title','Download a copy of this document to your computer as a DOCX file.');
        document.getElementById('sfdt').setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
      },
      save: function (format) {
        console.log("4");
        this.$refs.doceditcontainer.ej2Instances.documentEditor.save( this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName == '' ? 'sample' :  this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName, format);
      },
      openBtnClick: function () {
        console.log("5");
        this.$refs.uploadDocument.click();
      },
      printBtnClick: function () {
        console.log("6");
        this.$refs.doceditcontainer.ej2Instances.documentEditor.print();
      },
      titleBarKeydownEvent: function (e) {
        console.log("7");
        if (e.keyCode === 13) {
          e.preventDefault();
          document.getElementById("documenteditor_title_contentEditor").contentEditable = 'false';
          if (document.getElementById("documenteditor_title_contentEditor").textContent === '') {
              document.getElementById("documenteditor_title_contentEditor").textContent = 'Document1';
          }
        }
      },
      titleBarBlurEvent: function () {
        console.log("8");
        if (document.getElementById("documenteditor_title_contentEditor").textContent === '') {
          document.getElementById("documenteditor_title_contentEditor").textContent = 'Document1';
        }
        document.getElementById("documenteditor_title_contentEditor").contentEditable = 'false';
        this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName = document.getElementById("documenteditor_title_name").textContent;
      },
      titleBarClickEvent: function () {
        console.log("9");
        this.updateDocumentEditorTitle();
      },
      updateDocumentEditorTitle: function () {
        console.log("10");
        document.getElementById("documenteditor_title_contentEditor").contentEditable = 'true';
        document.getElementById("documenteditor_title_contentEditor").focus();
        window.getSelection().selectAllChildren(document.getElementById("documenteditor_title_contentEditor"));
      },
      documentChangedEvent: function () {
        console.log("11");
        var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
        this.documentTitle = obj.documentName === '' ? 'Untitled Document' : obj.documentName;
        document.getElementById("documenteditor_title_name").textContent = obj.documentName ;
        setTimeout(() => { obj.scrollToPage(1); }, 10);
      },
      updateDocumentEditorSize: function () {
        console.log("12");
        var windowWidth = window.innerWidth -18;
        var windowHeight = window.innerHeight - (document.getElementById("documenteditor_titlebar").offsetHeight +26);
        this.$refs.doceditcontainer.ej2Instances.resize(windowWidth, windowHeight);
      },
      onWindowResize: function () {
        console.log("13");
        this.updateDocumentEditorSize();
      },
      openTemplate: function () {
        console.log("14");
        var uploadDocument = new FormData();
        uploadDocument.append('DocumentName', 'Getting Started.docx');
        var loadDocumentUrl =
          this.$refs.doceditcontainer.ej2Instances.serviceUrl + 'LoadDocument';
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', loadDocumentUrl, true);
        var dataContext = this;
        httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 304) {
              dataContext.$refs.doceditcontainer.ej2Instances.documentEditor.open(
                httpRequest.responseText
              );
            }
          }
        };
        httpRequest.send(uploadDocument);
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.$refs.doceditcontainer.ej2Instances.locale = 'en-US';
        this.$refs.doceditcontainer.ej2Instances.serviceUrl = this.serviceUrl;
        this.$refs.doceditcontainer.ej2Instances.documentChange = () => {
          this.documentChangedEvent();
        };
        var obj = this;
        setTimeout(() => {
          obj.updateDocumentEditorSize();
        }, 100);
        window.addEventListener('resize', obj.onWindowResize);
        this.openTemplate();
      });
    },
  };
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
</style>
<!-- <template>
    <h1>
        
    </h1> -->
    <!-- <div id="app">
      <editor
        api-key="no-api-key"
        :init="{
          height: 500,
          menubar: false,
          plugins: [
            'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
            'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
            'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
          ],
          toolbar:
            'undo redo | casechange blocks | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlst checklist outdent indent | removeformat | a11ycheck code table help'
        }"
        initial-value="Welcome to TinyMCE Vue"
      />
    </div> -->
    <!-- </template> -->
    
 <!-- <script>
    // import Editor from '@tinymce/tinymce-vue'
    
    // export default {
    // name: 'app',
    // components: {
    //   'editor': Editor
    // }
    // }
    </script> -->
<!--<template>
    <h1>Home</h1>
     <NavBar/>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">FASHION SHOP
                    <router-link to="/contacts/add" class="btn btn-success btn-sm">
                        <i class="fa fa-plus"></i>
                        New
                    </router-link>
                </p>
                <p class="fst-italic">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <form action="">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col">
                            <input type="text" class="form-control" placeholder="Seach Name">
                        </div>
                        <router-link to="" class="col">
                            <input type="submit" class="btn btn-outline-dark" value="Submit">
                        </router-link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  <div class="container mt-3" v-if="contacts.length >0 ">
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1" v-for="contact of contacts" :key="contact">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="w-100 imgelement" :src="contact.photo" alt="">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 class="text-truncate mb-3 text_font">{{ contact.name }}</h6>
                        <div class="d-flex justify-content-center">
                            <h6 class="cost">{{ contact.cost }}</h6><h6 class="text-muted ml-2 text_font"><del>{{ contact.discount }}</del></h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <router-link :to="`/Home/ViewDetail/${contact.id}`" class="btn btn-sm text-dark p-0 text_font">
                            <i class="fas fa-eye text-danger mr-1"></i>View Detail
                        </router-link>
                        <router-link to="/Home/AddToCart" >
                            <a href="" class="btn btn-sm text-dark p-0 text_font"><i class="fas fa-shopping-cart text-danger mr-1"></i>Add To Cart</a>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <Footer/> 
</template>-->

<!-- <script>
import Footer from '@/components/Footer.vue';
import { ContactService } from '@/services/ContactService';
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'HomeView',
  components: { Footer, NavBar },
  data: function () {
        return {
            loading: false,
            contacts: [],
            errorMessage: null
        };
    },
    created: async function () {
        try {
            this.loading = true;
            let response = await ContactService.getAllContacts();
            this.contacts = response.data;
            this.loading = false;
        }
        catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
    },
    

}
</script>
<style>
    .text_font{
        font-family: "Comic Sans MS", cursive, sans-serif;
    }
    .cost{
        padding-right: 10px;
    }
    .imgelement{
        height: 350px;
        object-fit: cover;
    }
</style> -->
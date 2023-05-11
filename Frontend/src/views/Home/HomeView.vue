<template>
    <div>
      <HeaderView  />
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
  import HeaderView from '../../components/HeaderView.vue';
  import {DocumentEditorContainerComponent,Toolbar} from '@syncfusion/ej2-vue-documenteditor';
  import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
  import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
  
  //Component registeration
  export default {
    components: {
      // Declaring component
      'HeaderView':HeaderView,
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

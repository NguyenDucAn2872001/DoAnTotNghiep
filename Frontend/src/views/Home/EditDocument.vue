<template>
    <div>
      <!-- <HeaderView  /> -->
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
    mounted () {
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
  
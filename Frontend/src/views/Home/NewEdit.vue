<template>
  <HeaderView :data="getid" style="z-index: 1;"/>
    <div v-if="editor" style="padding-top: 100px;display: flex;justify-content: center; height: 1100px; background-color: #fff;">
      <div style="width: 100%;">
        <div class="" style="z-index: 1;background-color: beige;height: 100px;position: fixed;width: 100%;top:80px;display: flex;padding-top: 10px;justify-content: center;">

          <button type="button" class="btn me-1" @click="addImage" style="background-color: #958DF1; width: 80px;height: 32px;">
            <i class="fa-solid fa-plus me-3" style="color: #fff;"></i>
            <i class="fa-solid fa-image" style="color: #fff;"></i>
          </button>

          <el-dropdown class=" me-1" >
            <el-button type="success">
              <i class="fa-solid fa-table"></i>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()" style="background-color: #958DF1; width: 100%;">
                    insertTable
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().addColumnBefore().run()" style="background-color: #FFCC99; width: 100%;">
                    addColumnBefore
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().deleteColumn().run()" style="background-color: #CCCCFF; width: 100%;">
                    deleteColumn
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().addRowBefore().run()" style="background-color: #99CC99; width: 100%;">
                    addRowBefore
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().deleteRow().run()" style="background-color: #BB0000; width: 100%;">
                    deleteRow
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().deleteTable().run()" style="background-color: #99FFFF; width: 100%;">
                    deleteTable
                  </button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown class=" me-1" >
            <el-button type="warning">
              <i class="fa-solid fa-heading"></i>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" style="background-color: #33FFFF; width: 100%;">
                    H1
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" style="background-color: #FFCCFF; width: 100%;">
                    H2
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" style="background-color: #99CCFF; width: 100%;">
                    H3
                  </button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown class=" me-1" >
            <el-button type="primary">
              <i class="fa-solid fa-palette"></i>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <input type="color" @input="editor.chain().focus().setColor($event.target.value).run()" :value="editor.getAttributes('textStyle').color">
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().setColor('#958DF1').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' })}" style="background-color: #958DF1; width: 100%;">
                    purple
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().setColor('#F98181').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#F98181' })}" style="background-color: #F98181; width: 100%;">
                    red
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().setColor('#FBBC88').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#FBBC88' })}" style="background-color: #FBBC88; width: 100%;">
                    orange
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().setColor('#FAF594').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#FAF594' })}" style="background-color: #FAF594; width: 100%;">
                    yellow
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().setColor('#70CFF8').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#70CFF8' })}" style="background-color: #70CFF8; width: 100%;">
                    blue
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().setColor('#94FADB').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#94FADB' })}" style="background-color: #94FADB; width: 100%;">
                    teal
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn btn-light" @click="editor.chain().focus().unsetColor().run()" style=" width: 100%;">
                    unsetColor
                  </button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown class=" me-1" >
            <el-button type="info">
              <i class="fa-solid fa-list-check"></i>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" style="background-color: #958DF1; width: 100%;">
                    toggleBulletList
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().splitListItem('listItem').run()" :disabled="!editor.can().splitListItem('listItem')" style="background-color: #99FF33; width: 100%;">
                    splitListItem
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().sinkListItem('listItem').run()" :disabled="!editor.can().sinkListItem('listItem')" style="background-color: #33FFFF; width: 100%;">
                    sinkListItem
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().liftListItem('listItem').run()" :disabled="!editor.can().liftListItem('listItem')" style="background-color: #FFCCFF; width: 100%;">
                    liftListItem
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown class=" me-1" >
            <el-button type="#b3e19d" style="background-color: #b3e19d;">
              <i class="fa-solid fa-bold"></i>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" style="background-color: #958DF1; width: 100%;">
                    toggleBold
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().setBold().run()" :disabled="editor.isActive('bold')" style="background-color: #00CC00; width: 100%;">
                    setBold
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().unsetBold().run()" :disabled="!editor.isActive('bold')" style="background-color: 	#339999; width: 100%;">
                    unsetBold
                  </button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown class=" me-1" >
            <el-button type="" style="background-color:  #f3d19e;">
              <i class="fa-solid fa-highlighter"></i>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <button type="button" class="btn" @click=" editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()" :class="{ 'is-active': editor.isActive('highlight', { color: '#ffc078' }), }" style="width: 100%;background-color: orange;">
                    orange
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn btn-success" @click="editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()" :class="{'is-active': editor.isActive('highlight', { color: '#8ce99a' }), }" style="width: 100%;">
                    green
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn btn-primary" @click="editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()" :class="{'is-active': editor.isActive('highlight', { color: '#74c0fc' }),}" style="width: 100%;">
                    blue
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn" @click="editor.chain().focus().toggleHighlight({ color: '#FFFF00' }).run()" :class="{'is-active': editor.isActive('highlight', { color: '#FFFF00' }),}" style="width: 100%; background-color: yellow;">
                    Yellow
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn btn-danger" @click="editor.chain().focus().toggleHighlight({ color: 'red' }).run()" :class="{ 'is-active': editor.isActive('highlight', { color: 'red' }) }" style="width: 100%;">
                    red 
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <button type="button" class="btn btn-light" @click="editor.chain().focus().unsetHighlight().run()" :disabled="!editor.isActive('highlight')" style="width: 100%;">
                    Tắt Highlight
                  </button>
                </el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <button type="button" class="btn"  @click="saveAsPdf" style="display: flex; align-items: center; background-color: orange;height: 32px;">
            <div>PDF </div>
            <i class="fa-solid fa-download ms-2"></i>
          </button>
        </div>
        <div style="z-index: 2;display: flex;justify-content: center;height: 1000px;padding-top: 150px;background-color: #fff;padding-bottom: 50px;">
          <div style="width: 60%;background-color: #fff;;border: 1px solid black;">
            <editor-content :editor="editor"  id="content-to-pdf"/>
          </div>
          
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import axios  from 'axios';
import {useRoute} from 'vue-router'
import { ref, onBeforeUnmount,onMounted } from "vue";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import html2pdf from 'html2pdf.js';

import Gapcursor from '@tiptap/extension-gapcursor'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Heading from '@tiptap/extension-heading'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Bold from '@tiptap/extension-bold'
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";

import { Editor, EditorContent } from "@tiptap/vue-3";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import HeaderView from '../../components/HeaderView.vue'
import { ArrowDown } from '@element-plus/icons-vue'

const propData = ref('Hello from parent');

const route=useRoute()
const getid=route.params.id 
const color=["#00FFFF","#C0C0C0","#f783ac","#FFFF66","#99FF33","#FF9900","#CC3333"]
const randomElement = color[Math.floor(Math.random() * color.length)];
const nameInput = ref("");
const editor = ref(null);
const provider = ref(null);
const name = ref("");
const ListUser=ref([])
const data=ref("")

onMounted(async()=>{
  await getInfoUser()
  name.value = nameInput.value;
  console.log(name.value);
  editRealtime();
});

const saveAsPdf = async () => {
  const content = document.getElementById('content-to-pdf');

  const opt = {
    margin: 1,
    filename: 'your-filename.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(content).save();
};
  
const getInfoUser = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GETAPI_USER).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].id==getid){
            nameInput.value=response.data[i].name
        }
      }
    //   for (let i = 0; i < response.data.length; i++) {
    //     infoUser.value.push(response.data[i])
    //     if (response.data[i].name!=name.value) {
    //       users.value.push(response.data[i].name)
          
    //     }
    //   }
    })
  } catch (error) {
      console.log(error);
  }
}
// hàm lưu dữ liệu lên database
const saveDocument=()=>{

}

//hàm kiểm tra xem đã có ai vào trước chưa , nếu rồi thì không get dữ liệu về nữa
// const checkLogin =(data,length)=>{
//     console.log(length);
    
//         data= localStorage.getItem('editorContent')
//         return data

    
// }
const editRealtime = () => {
    const ydoc = new Y.Doc();

    provider.value = new WebrtcProvider(
        "tiptap-collaboration-cursor-extension",
        ydoc
    );

    editor.value = new Editor({
        extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        BulletList,
        ListItem,
        Color,
        TextStyle,
        Image,
        Dropcursor,
        Gapcursor,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Highlight.configure({ multicolor: true }),
        Collaboration.configure({
            document: ydoc,
            
        }),
        CollaborationCursor.configure({
            provider: provider.value,
            user: {
            name: name.value,
            color: randomElement,
            },
        }),
        Placeholder.configure({
            placeholder:
            "Write something … It’ll be shared with everyone else looking at this example.",
        }),
        
        ],
        // content: checkLogin(data.value,ListUser.value.length),
    });
    provider.value.awareness.on("change", () => {
        // const users = Array.from(provider.value.awareness.getStates());
        // for (let i = 0; i < users.length; i++) {
        // let id =users[i][0]
        // let name =users[i][1].user.name
        // if (ListUser.value.findIndex(obj => obj.id === id && obj.name === name)=== -1){
        //     ListUser.value.push({id,name})
        // }
        
        // }  
    });
    editor.value.on('update', () => {

        // const content = ydoc.toJSON().default;
        // const div = document.createElement('div');
        // div.innerHTML = content;

        // const paragraphs = div.querySelectorAll('paragraph');
        // const lines = Array.from(paragraphs).map(paragraph => paragraph.innerHTML);
        
        // const clients = Array.from(ydoc.store.clients);
        // clients.forEach(client => {
        // const clientId = client[0];
        // const clientName = ListUser.value.find(user => user.id === clientId)?.name;
        // if (clientName) {
        //     const updateContent = content[clientId];
        //     console.log(`${clientName}: ${lines}`);
        //     localStorage.setItem('editorContent', clientName,lines);
        // }
        // });
        
    })


}
onBeforeUnmount(() => {
    editor.value.destroy();
    provider.value.destroy();
});

const addImage= ()=> {
  const url = window.prompt('URL')

  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}
</script>
  
<style>
/* table tbody,
table td,
table tfoot,
table th,
table thead,
table tr {
  border-width: initial;
} */
.ProseMirror {
  height: 800px;
  padding: 30px;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
  
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  word-break: normal;
  pointer-events: none;
}

.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0d0d0d;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}
img {
  max-width: 100%;
  height: auto;
}
&.ProseMirror-selectednode {
  outline: 3px solid #68CEF8;
}
table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
  border-width: 1px;
}
  
td,th {
  min-width: 1em;
  border: 2px solid #ced4da;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
}
th {
  font-weight: bold;
  text-align: left;
  background-color: #f1f3f5;
}

.selectedCell:after {
  z-index: 2;
  position: absolute;
  content: "";
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}

.column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: -2px;
  width: 4px;
  background-color: #adf;
  pointer-events: none;
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>
  
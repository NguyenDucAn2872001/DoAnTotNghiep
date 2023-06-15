<template>
    <div v-if="editor">
      <button
        @click="editor.chain().focus().toggleHighlight().run()"
        :class="{ 'is-active': editor.isActive('highlight') }"
      >
        toggleHighlight
      </button>
      <button
        @click="
          editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()
        "
        :class="{
          'is-active': editor.isActive('highlight', { color: '#ffc078' }),
        }"
      >
        orange
      </button>
      <button
        @click="
          editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()
        "
        :class="{
          'is-active': editor.isActive('highlight', { color: '#8ce99a' }),
        }"
        style="background-color: green;color: aliceblue;"
      >
        green
      </button>
      <button
        @click="
          editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()
        "
        :class="{
          'is-active': editor.isActive('highlight', { color: '#74c0fc' }),
        }"
        style="background-color: blue;color: aliceblue;"

      >
        blue
      </button>
      <button
        @click="
          editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()
        "
        :class="{
          'is-active': editor.isActive('highlight', { color: '#b197fc' }),
        }"
      >
        purple
      </button>
      <button
        @click="editor.chain().focus().toggleHighlight({ color: 'red' }).run()"
        :class="{ 'is-active': editor.isActive('highlight', { color: 'red' }) }"
      >
        red ('red')
      </button>
      <button
        @click="
          editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()
        "
        :class="{
          'is-active': editor.isActive('highlight', { color: '#ffa8a8' }),
        }"
      >
        red (#ffa8a8)
      </button>
      <button
        @click="editor.chain().focus().unsetHighlight().run()"
        :disabled="!editor.isActive('highlight')"
      >
        unsetHighlight
      </button>
      <button
        @click=""
      >
        save database
      </button>
  
      <editor-content :editor="editor" style="width: 600px;min-height: 500px;background-color: azure;border: 1px solid black;"/>
    </div>
  </template>
  
<script setup>
import axios  from 'axios';
import {useRoute} from 'vue-router'
import { ref, onBeforeUnmount,onMounted } from "vue";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

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
editRealtime();
});
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
const checkLogin =(data,length)=>{
    console.log(length);
    
        data= localStorage.getItem('editorContent')
        return data

    
}
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
        content: checkLogin(data.value,ListUser.value.length),
    });
    provider.value.awareness.on("change", () => {
        const users = Array.from(provider.value.awareness.getStates());
        //const currentUserID = provider.value.awareness.clientID;
        //console.log(currentUserID);

        for (let i = 0; i < users.length; i++) {
        let id =users[i][0]
        let name =users[i][1].user.name
        if (ListUser.value.findIndex(obj => obj.id === id && obj.name === name)=== -1){
            ListUser.value.push({id,name})
        }
        
        }  
        //console.log(ListUser.value[1].name);
        //console.log(currentUserID);
    });
    editor.value.on('update', () => {

        const content = ydoc.toJSON().default;
        const div = document.createElement('div');
        div.innerHTML = content;

        const paragraphs = div.querySelectorAll('paragraph');
        const lines = Array.from(paragraphs).map(paragraph => paragraph.innerHTML);
        
        // console.log(id,lines);

        const clients = Array.from(ydoc.store.clients);
        clients.forEach(client => {
        const clientId = client[0];
        const clientName = ListUser.value.find(user => user.id === clientId)?.name;
        if (clientName) {
            const updateContent = content[clientId];
            console.log(`${clientName}: ${lines}`);
            localStorage.setItem('editorContent', clientName,lines);
        }
        });
        
        //console.log(Array.from(ydoc.store.clients),":",ydoc.toJSON().default) 
        
    })


}
onBeforeUnmount(() => {
    editor.value.destroy();
    provider.value.destroy();
});
  </script>
  
  <style>
  
  
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
  </style>
  
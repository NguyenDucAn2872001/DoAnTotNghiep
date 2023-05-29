<template>
    <div style="padding: 40px;">
        <form action="" @submit.prevent="onConnect">
            <input type="text" placeholder="enter username" v-model="username">
            <button type="submit" @click="check= true">Click</button>
        </form>
        

    
        <div class="mb-5" >
            <div class="mb-5">
                <ul>
                    <li v-for="user in users" :key="user.userId" style="display: flex;align-items: center;">
                    <button @click="onselectedtosend(user)" style="border: none; margin-bottom: 10px; display: flex;align-items: center;">
                        <span>{{ user.username }}</span>
                        <div style="margin-left: 20px;width: 7px;height: 7px;background-color: green;border-radius: 50%;"></div>
                    </button>
                    </li>
                </ul>
            </div>
            <div v-if="selectUserToSend">
                <div style="display: flex;align-items: center;">
                    <span>{{ selectUserToSend.username }}</span>
                    <div style="margin-left: 20px;width: 7px;height: 7px;background-color: green;border-radius: 50%;"></div>
                </div>
                
                <div>
                    <div v-for="messagee in listMessage" style="display: flex;">
                        <div v-if="messagee.from==usernameGues">You :{{ messagee.message }}</div>
                        <div v-if="messagee.to==usernameGues"> {{ usernameGues }} :{{ messagee.message }}</div>
                        <!-- <div>{{ message.isSelf? "You :":selectUserToSend.username+":" }}</div>
                        <div>{{ message.message }}</div> -->
                        <!-- <div>{{ messageRes }}</div> -->
                    </div>
                </div>
                
                <form  @submit.prevent="OnSendMessage" >
                    <input type="text" placeholder="input message" v-model="message">
                    <button type="submit">send</button>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import socket from '../../../plugins/socket'
import{ref,onMounted} from 'vue'

const username=ref("")
const users=ref([])
const check=ref(false)
const selectUserToSend=ref()
const listMessage=ref([])
const message=ref("")
const usernameGues=ref("")


const onConnect=()=>{
    socket.auth={
        username:username.value,
    }
    socket.connect()
}
const OnSendMessage=()=>{
    listMessage.value.push({
        message:message.value,
        to:1,
        from:usernameGues.value
    })
    socket.emit("privateMessaGE",{
        message:message.value,
        to:selectUserToSend.value.userId
    })
    // if(!selectUserToSend.value.messages){selectUserToSend.value.messages=[]}
    // selectUserToSend.value?.messages.push({
    //     message,
    //     isSelf:true
    // })
    message.value=""
}
const onselectedtosend=(user)=>{
    selectUserToSend.value=user
    usernameGues.value=user.userId
    console.log(usernameGues.value);
}

onMounted(()=>{
    console.log(selectUserToSend.value);
    console.log(usernameGues.value);
    socket.on('getUsers',(data)=>{
        data.forEach(user => {
            user.self= user.userId===socket.id
        });
        users.value=data.sort((a,b)=>{
            if(a.self) return -1;
            if(b.self) return 1;
            if(a.username<b.username) return-1
            return a.username>b.username?1:0;
        })
        console.log(users.value);
    })
    socket.on("userJustConnected",(data)=>{
        users.value.push(data)
        console.log("user Just Connected",users.value);
    })
    socket.on("privateMessageToReceiver",({message,from})=>{
        console.log("tesst ",from,":",message);
        listMessage.value.push({
            message:message,
            to:from
        })
        // for (let i = 0; i < users.value.length; i++) {

        //     const user = users.value[i]
        //     console.log(users.value[i]);
        //     if(user.userId === from){
        //         if(!user.messages){user.messages=[]}
        //         user.messages.push({
        //             message,
        //             isSelf:false
        //         })
        //         console.log(user.messages);
        //         console.log(selectUserToSend.value);
        //         if(user.userId!==selectUserToSend.value?.userId) user.isHanNewMessage=true;
        //         break;
        //     }
            
        // }
    })
})
</script>
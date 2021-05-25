<template>
    <div>
        <div>
            <h2>{{$route.params.name}} 채팅방</h2>
        </div>
		<hr />
        <div v-for="(m, idx) in message" :key="idx">
      		<div v-bind:class="m.style">
      			<h5 style="margin:3px">
        			{{m.sendername}}
        		</h5>
      			{{m.content}}
      		</div>
    	</div>
    	<hr />
    	<input type="text" v-model="content" placeholder="보낼 메세지" size="100" />
    	<button @click="sendMessage()"> SEND</button>
    </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

import { mapActions, mapState } from "vuex";
export default {
    name: "MeseegeDetail",
    data() {
        return {
      		id: -1,
      		nickname: '',
      		title:'',
      		roomid: -1,
      		idx:0,
      		message:[],
      		content:"",
			stompClient:null
        }
    },
      computed: {
    ...mapState(["roomInfo", "member", "msg"]),
  },
    created() {
        this.id = this.member.data.id;
		this.roomid = this.$route.params.id;
    	this.nickname = this.member.data.id;
		this.getChat(this.roomid);
		let socket = new SockJS('http://localhost:8092/ws');
    	this.stompClient = Stomp.over(socket);
    	this.stompClient.connect({}, frame=>{
      		console.log("success", frame)
      		this.stompClient.subscribe("/sub/"+this.roomid, res=>{
        		let jsonBody = JSON.parse(res.body);
             	let m={
            		'senderName':jsonBody.senderName,
            		'content': jsonBody.content,
            		'style': jsonBody.senderId == this.id ? 'myMsg':'otherMsg'
          		}
          		this.message.push(m);
      		})
    	}, err=>{
			console.log("fail", err);
    	})
    },
    methods: {
		...mapActions(["getMsg"]),
		sendMessage(){
     		if(this.content.trim() !='' && this.stompClient!=null) {
        		let chatMessage = {
          			'content': this.content,
          			'chatroomId' : this.roomid,
          			'senderName':this.nickname,
          			'senderId': this.id,
          			'id':"0"
        		}
        		this.stompClient.send("/pub/message", JSON.stringify(chatMessage),{});
   
        		this.content='';
    		}
    	},
		getChat(no){
			this.getMsg(no);
			this.message = [];
			if(!isNaN(this.msg)){
				for(let i=this.msg.length-1; i>-1; i--){
          		let m={
            		'senderName':this.msg[i].senderName,
            		'content':this.msg[i].content,
            		'style': this.msg[i].senderId == this.id ? 'myMsg':'otherMsg'
          		}
          		this.message.push(m);
        	}
			}
		}
    },
}
</script>

<style>

</style>
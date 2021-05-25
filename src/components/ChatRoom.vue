<template>
    <div>
        <b-container>
        <b-table id="chat_table" :items="rooms.data" :fields="fields" >
             <template #cell(enter)="roomName">
        <b-button size="sm" @click="$router.push({name: 'Messege', params: {name: roomName.item.roomName, id: roomName.item.roomId}})" class="mr-2">입장
        </b-button>
      </template>
	  </b-table>
        </b-container>
    </div>
</template>

<script>

import { mapActions, mapState} from "vuex";

export default {
    name: "ChatRoom",
    data() {
        return {
            fields: [
        { label: "방 번호", key: "roomId" },
        { label: "방 이름", key: "roomName" },
        { label: "입장", key: "enter" },
      ],
        }
    },
    computed: {
        ...mapState(["rooms"]),
    },
    created() {
        this.findAllRoom();
    },
    methods: {
        ...mapActions(["getRooms"]),
        findAllRoom(){
            this.getRooms();
        },

    },
}
</script>

<style>

</style>
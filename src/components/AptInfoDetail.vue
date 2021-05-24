<template>
    <div>
        <b-container class="container">
        <b-table id="aptdetail_table" :items="apt" :fields="fields" >
	  </b-table>
        </b-container>
    </div>
</template>

<script>

import { mapState } from "vuex";

export default {
    name: "AptInfoDetail",
    data() {
        return {
            fields: [
                { label: "No.", key: "no" },
                { label: "floor.", key: "floor" },
                { label: "houseName", key: "houseName" },
             ],
        }
    },
        computed: {
        ...mapState(["apt"]),
    },
    methods: {
        
    },
}
</script>

<style>

</style>
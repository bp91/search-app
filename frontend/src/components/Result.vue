<template>
    <div class="resultContainer">
        <div class="row row-error" v-if="errorMessage != ''">
            <div class="col-xs-4">
            </div>
            <div class="col-xs-4">
                <div class="alert alert-danger">
                    <p>{{ errorMessage }}</p>
                </div>
            </div>
            <div class="col-xs-4">
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 col-lg-4">
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 inputBox">
                <div class="row">
                    <div class="col-xs-12">
                        <input type="text" v-model="searchInput"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6 indexSelect">
                        <select v-model="selectedIndex">
                            <option v-for="index in indices" :key="index.id">{{index.value}}</option>
                        </select>
                    </div>
                    <div class="col-xs-6 sendBox">
                        <button :disabled="disableSend" :class="{ buttonDisabled : disableSend }" v-on:click="sendRequest()">Send</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-lg-4">
            </div>
        </div>
        <div class="row">
            <div class="col-xs-2 filters">

            </div>
            <div class="col-xs-8 results">

            </div>
            <div class="col-xs-2">
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            searchInput : "",
            errorMessage : "",
            disableSend : true,
            indices : [
                {
                    "id" : 1,
                    "value" : "categories"
                }, 
                {
                    "id" : 2, 
                    "value" : "psychographics"
                }
            ],
            selectedIndex : "categories"
        }
    },
    mounted() {
        this.searchInput = this.$store.state.searchInput != undefined ? this.$store.state.searchInput : "";
        this.indices = this.$store.state.indices != undefined ? this.$store.state.indices : this.indices;
        this.selectedIndex = this.$store.state.selectedIndex != undefined? this.$store.state.selectedIndex : "";
    },
}
</script>
<style>

</style>


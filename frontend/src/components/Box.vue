<template>
    <div class="boxContainer">
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
                        <input type="text" v-model="searchInput" @keydown="detectEnterSearch"/>
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
    </div>
</template>
<script>
    import axios from 'axios';

    const env = process.env.NODE_ENV || 'development';
    const config = require("../../config/config.json").server[env];
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
        watch : {
            "searchInput" : function(newValue) {
                if(newValue != "") {
                    this.disableSend = false;
                }else {
                    this.disableSend = true;
                }
            }
        },
        methods: {
            checkParameters() {
                let me = this;
                if(this.searchInput != "" && this.selectedIndex != "") {
                    let foundIndex = false;
                    this.indices.forEach(function(index) {
                        if(index.value == me.selectedIndex) {
                            foundIndex = true;
                        }
                    });
                    return foundIndex;
                }else {
                    return false;
                }
            },
            sendRequest() {
                if(this.checkParameters()) {
                    axios.get(config.url + ":" + config.port + "/" + this.selectedIndex,{
                    params : {
                        name : this.searchInput
                    }
                    }).then(response => {
                        this.$store.state.results = response.data;
                        this.$store.state.searchInput = this.searchInput;
                        this.$store.state.indices = this.indices;
                        this.$store.state.selectedIndex = this.selectedIndex;
                        this.$router.push("/search");
                    }).catch(error => {
                        if(error.hasOwnProperty("response")) {
                            if(error.response.hasOwnProperty("data")) {
                                if(error.response.data.hasOwnProperty("message")) {
                                    this.errorMessage = error.response.data.message;
                                }else {
                                    this.errorMessage = error.response.data;
                                }
                            }else {
                                this.errorMessage = error.response;
                            }
                        }else {
                            this.errorMessage = error;
                        }
                    });
                }
            },
            detectEnterSearch(event) {
                if(event.keyCode === 13) {
					if(this.searchInput != "") {
						this.sendRequest();
					}
				}
            }
        }
    };
</script>
<style>
    .boxContainer {
        margin-top: 80px;
    }
    
    .inputBox input {
        width: 100%;
    }

    input[type=text], select {
        padding: 7px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .indexSelect select {
        width: 100%
    }

    .sendBox button {
        width: 100%;
        background-color: #4CAF50;
        color: white;
        padding: 3px 20px;
        margin-top: 6px;
        margin-left: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .sendBox button:hover {
        background-color: #45a049;
    }

    .buttonDisabled {
        background-color: #88e88c;
    }
</style>

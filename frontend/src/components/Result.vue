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
                <div class="row operator">
                    <div class="col-xs-12">
                        <select>
                            <option v-for="operator in operators" :key="operator">{{operator}}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div v-if="selectedIndex == 'categories'" class="categoriesFilters">
                            <select>
                                <option v-for="category in categoriesFilters" :key="category.value">{{category.value}}</option>
                            </select>
                        </div>
                        <div v-if="selectedIndex == 'psychographics'" class="psychographicsFilters">
                            <select>
                                <option v-for="psychographic in psychographicsFilters" :key="psychographic.value">{{psychographic.value}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-8 results">
                <div class="resultsBox" v-for="(document, index) in results" :key="index">
                    <div v-if="selectedIndex == 'categories'">
                        <document-category></document-category>
                    </div>
                    <div v-if="selectedIndex == 'psychographics'">
                        <document-psychographic></document-psychographic>
                    </div>
                </div>
            </div>
            <div class="col-xs-2">
            </div>
        </div>
    </div>    
</template>
<script>
    import axios from 'axios';
    import jsonArray from 'json-array-split';
    import DocumentCategory from'@/components/DocumentCategory.vue';
    import DocumentPsychographic from'@/components/DocumentPsychographic.vue';

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
                results : [],
                operators : ["AND", "OR"],
                selectedIndex : "categories",
                activeFilters : {},
                categoriesFilters : [],
                psychographicsFilters : []
            }
        },
        components : {
            DocumentCategory,
            DocumentPsychographic
        },
        mounted() {
            this.searchInput = this.$store.state.searchInput != undefined ? this.$store.state.searchInput : "";
            this.indices = this.$store.state.indices != undefined ? this.$store.state.indices : this.indices;
            this.selectedIndex = this.$store.state.selectedIndex != undefined? this.$store.state.selectedIndex : "";
            this.activeFilters = this.$store.state.activeFilters != undefined? this.$store.state.activeFilters : {};
            this.results = this.$store.state.results != undefined? this.$store.state.results : [];
            if(this.searchInput != "") {
                this.activeFilters["name"] = this.searchInput;
            }
            if(this.categoriesFilters.length == 0) {
                this.getCategoriesSchema();
            }
            if(this.psychographicsFilters.length == 0) {
                this.getPsychographicsSchema();
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
            getCategoriesSchema() {
                axios.get(config.url + ":" + config.port + "/categoriesSchemaFields"
                ).then(response => {
                    if(response.data.hasOwnProperty("message")) {
                        for(var key in response.data.value) {
                            let obj = response.data.value[key];
                            obj["name"] = key;
                            this.categoriesFilters.push(obj);
                        }
                    }else {
                        this.categoriesFilters = response.data;
                    }
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
            },
            getPsychographicsSchema() {
                axios.get(config.url + ":" + config.port + "/psychographicsSchemaFields"
                ).then(response => {
                    if(response.data.hasOwnProperty("message")) {
                        for(var key in response.data.value) {
                            let obj = response.data.value[key];
                            obj["name"] = key;
                            this.psychographicsFilters.push(obj);
                        }
                    }else {
                        this.psychographicsFilters = response.data;
                    }
                    
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
            },
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
                        this.results = response.data;
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
            }
        }
    };
</script>
<style>
    .operator select {
        margin-left: -32px;
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


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
        <div class="row">
            <div class="col-xs-4 filters">
                <div class="row operator">
                    <div class="col-xs-6">
                        <select>
                            <option v-for="operator in operators" :key="operator">{{operator}}</option>
                        </select>
                    </div>
                    <div class="col-xs-6">
                    </div>
                </div>
                <div class="row" v-if="selectedIndex == 'categories'">
                    <div class="col-xs-6">
                        <select v-model="filterName">
                            <option>None</option>
                            <option v-for="category in categoriesFilters" :key="category.value">{{category.value}}</option>
                        </select>
                    </div>
                    <div class="col-xs-6 categoryFilterValue" v-if="checkFilterNone()">
                        <input type="text" v-model="filterValue" @keydown="detectEnterFilter"/>
                        <i class="fa fa-plus" @click="addFilter"></i>
                    </div>
                </div>
                <div class="row" v-if="selectedIndex == 'psychographics'">
                    <div class="col-xs-6">
                        <select v-model="filterName">
                            <option>None</option>
                            <option v-for="psychographic in psychographicsFilters" :key="psychographic.value">{{psychographic.value}}</option>
                        </select>
                    </div>
                    <div class="col-xs-6 categoryPsychographicValue" v-if="checkFilterNone()">
                        <input type="text" v-model="filterValue" @keydown="detectEnterFilter"/>
                        <i class="fa fa-plus" @click="addFilter"></i>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 activeFilters">
                        <div class="activeFilter" v-for="filter in activeFilters" :key="getFilterValue(filter, getFilterKey(filter))">
                            <label>
                                {{getFilterKey(filter)}} : {{getFilterValue(filter, getFilterKey(filter))}}
                            </label>
                            <i class="fa fa-times"></i>
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
                filterName : "None",
                filterValue : "",
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
            this.activeFilters = this.$store.state.activeFilters != undefined? this.$store.state.activeFilters : [];
            this.results = this.$store.state.results != undefined? this.$store.state.results : [];
            if(this.searchInput != "") {
                if(this.selectedIndex == "categories") {
                    let me = this;
                    let noRepetition = this.activeFilters.filter(function(f) {
                        if(Object.keys(f)[0] == "name") {
                            return f["name"] == me.searchInput
                        }
                    });
                    if(noRepetition.length == 0) {
                        this.activeFilters.push({
                            "name" : this.searchInput
                        });
                    }
                }else {
                    let me = this;
                    let noRepetition = this.activeFilters.filter(function(f) {
                        if(Object.keys(f)[0] == "label") {
                            return f["label"] == me.searchInput
                        }
                    });
                    if(noRepetition.length == 0) {
                        this.activeFilters.push({
                            "label" : this.searchInput
                        });
                    }
                }
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
            },
            "selectedIndex" : function(newValue, oldValue) {
                if(newValue != oldValue) {
                    this.filterName = "None";
                    this.filterValue = "";
                    let me = this;
                    this.activeFilters = [];
                }
            },
            "filterName" : function(newValue, oldValue) {
                if(newValue != oldValue) {
                    this.filterValue = "";
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
                            if(obj.type == "string" || obj.type == "int") {
                                if(key != "name" && key != undefined) {
                                    obj["name"] = key;
                                    this.categoriesFilters.push(obj);
                                }
                            }
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
                            if(obj.type == "string" || obj.type == "int") {
                                if(key != "label" && key != undefined) {
                                    obj["name"] = key;
                                    this.psychographicsFilters.push(obj);
                                }
                            }
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
            refreshNameOrLabel() {
                let indicesToRemove = [];
                var i = 0;
                this.activeFilters.forEach(function(f) {
                    for(var key in f) {
                        if(key == "name" || key == "label") {
                            indicesToRemove.push(i);
                        }
                    }
                });
                let me = this;
                indicesToRemove.forEach(function(index) {
                    me.activeFilters.splice(index, 1);
                });
                console.log(this.activeFilters);
            },
            createJSON() {
                let json = {};
                this.activeFilters.forEach(function(f) {
                    for(var key in f) {
                        json[key] = f[key];
                    }
                });
                return json;
            },
            sendRequest() {
                if(this.checkParameters()) {
                    let parameters;
                    this.refreshNameOrLabel();
                    if(this.searchInput != "") {
                        if(this.selectedIndex == "categories") {
                            let me = this;
                            let noRepetition = this.activeFilters.filter(function(f) {
                                if(Object.keys(f)[0] == "name") {
                                    return f["name"] == me.searchInput
                                }
                            });
                            if(noRepetition.length == 0) {
                                this.activeFilters.push({
                                    "name" : this.searchInput
                                });
                            }
                        }else {
                            let me = this;
                            let noRepetition = this.activeFilters.filter(function(f) {
                                if(Object.keys(f)[0] == "label") {
                                    return f["label"] == me.searchInput
                                }
                            });
                            if(noRepetition.length == 0) {
                                this.activeFilters.push({
                                    "label" : this.searchInput
                                });
                            }
                        }
                    }
                    parameters = this.createJSON();
                    axios.get(config.url + ":" + config.port + "/" + this.selectedIndex,{
                    params : parameters
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
            },
            checkFilterNone() {
                if(this.filterName != "None") {
                    return true;
                }else {
                    return false;
                }
            },
            addFilter() {
                if(this.filterValue != "") {
                    const filterName = this.filterName;
                    this.activeFilters.push({
                        filterName : this.filterValue
                    });
                }
            },
            detectEnterSearch(event) {
                if(event.keyCode === 13) {
					if(this.searchInput != "") {
						this.sendRequest();
					}
				}
            },
            detectEnterFilter(event) {
                event = (event) ? event : window.event;
                var charCode = (event.which) ? event.which : eventa.keyCode;
                if(event.keyCode === 13) {
					if(this.filterValue != "") {
                        const filterName = this.filterName;
                        this.activeFilters.push({
                            filterName : this.filterValue
                        });
					}
				}else {
                    let me = this;
                    let typeFilter = "";
                    if(this.selectedIndex == "categories") {
                        typeFilter = this.categoriesFilters.filter(function(f) {
                            return f.value == me.filterName;
                        });
                    }else {
                        typeFilter = this.categoriesFilters.filter(function(f) {
                            return f.value == me.filterName;
                        });
                    }
                    if(typeFilter[0].type == "int") {
                        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                            event.preventDefault();;
                        } else {
                            return true;
                        }
                    }else {
                        return true;
                    }
                }
            },
            getFilterKey(filter) {
                return Object.keys(filter)[0];
            },
            getFilterValue(filter, key) {
                return filter[key];
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

    .categoryFilterValue input,
    .categoryPsychographicValue input {
        padding: 0px 0px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .categoryFilterValue {
        margin-left: -70px;
    }

    .categoryFilterValue i {
        cursor: pointer;
        color: white;
        margin-left: 10px;
    }

    .categoryPsychographicValue {
       margin-left: -70px; 
    }

    .categoryPsychographicValue i {
        cursor: pointer;
        color: white;
        margin-left: 10px;
    }

    .resultsBox {
        color: white;
    }

    .activeFilter {
        width: 120px;
        border: 1px solid;
        border-radius: 4px;
        margin: 4px 5px;
        background: #45a049;
        color: white;
    }

    .activeFilters {
        display: flex;
        flex-wrap: wrap;
    }

    .activeFilter i {
        cursor: pointer;
        margin-left: 6px;
    }
</style>


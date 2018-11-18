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
        <div class="row resultsAndFilter">
            <div class="col-xs-4 filters">
                <div class="row operator">
                    <div class="col-xs-6">
                        <select v-model="selectedOperator">
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
                        <div class="activeFilter" v-for="(filter, index) in activeFilters" :key="getFilterKey(filter)">
                            <label>
                                {{getFilterKey(filter)}} : {{getFilterValue(filter, getFilterKey(filter))}}
                            </label>
                            <i class="fa fa-times" @click="removeFilter(index)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-8 results">
                <div class="resultsBox" v-for="(document, index) in results" :key="index">
                    <document :documentType="selectedIndex" :documents="results"></document>
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
    import Document from'@/components/Document.vue';

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
                selectedOperator : "AND",
                selectedIndex : "categories",
                isFixed : false,
                activeFilters : {},
                filterName : "None",
                filterValue : "",
                categoriesFilters : [],
                psychographicsFilters : [],
                queries : [
                    {
                        isFixed : false,
                        selectedIndex : "categories",
                        query : "categories"
                    },
                    {
                        isFixed : true,
                        selectedIndex : "categories",
                        query : "fixedCategories"
                    },
                    {
                        isFixed : false,
                        selectedIndex : "psychographics",
                        query : "psychographics"
                    },
                    {
                        isFixed : true,
                        selectedIndex : "psychographics",
                        query : "fixedPsychographics"
                    }
                ]
            }
        },
        components : {
            Document
        },
        mounted() {
            this.searchInput = this.$store.state.searchInput != undefined ? this.$store.state.searchInput : "";
            this.indices = this.$store.state.indices != undefined ? this.$store.state.indices : this.indices;
            this.selectedIndex = this.$store.state.selectedIndex != undefined? this.$store.state.selectedIndex : "";
            this.activeFilters = this.$store.state.activeFilters != undefined? this.$store.state.activeFilters : [];
            this.results = this.$store.state.results != undefined? this.$store.state.results : [];
            if(this.searchInput != "") {
                if(this.selectedIndex == "categories") {
                    let noRepetition = this.activeFilters.filter(function(f) {
                        if(Object.keys(f)[0] == "name") {
                            return f["name"] == this.searchInput
                        }
                    }.bind(this));
                    if(noRepetition.length == 0) {
                        this.activeFilters.push({
                            "name" : this.searchInput
                        });
                    }
                }else {
                    let noRepetition = this.activeFilters.filter(function(f) {
                        if(Object.keys(f)[0] == "label") {
                            return f["label"] == this.searchInput
                        }
                    }.bind(this));
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
                    this.activeFilters = [];
                    this.results = [];
                    this.$store.state.selectedIndex = newValue;
                    this.$store.state.activeFilters = [];
                    this.$store.state.results = [];
                    this.isFixed = false;
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
                        response.data.forEach(function(f) {
                            if((f.type == "string" || f.type == "int") && f.value != "name") {
                                this.categoriesFilters.push(f);
                            }
                        }.bind(this));
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
                        response.data.forEach(function(f) {
                            if((f.type == "string" || f.type == "int") && f.value != "label") {
                                this.psychographicsFilters.push(f);
                            }
                        }.bind(this));
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
                let foundIndex = false;
                this.indices.forEach(function(index) {
                    if(index.value == this.selectedIndex) {
                        foundIndex = true;
                    }
                }.bind(this));
                return foundIndex;
            },
            refreshNameOrLabel() {
                let indicesToRemove = [];
                var i = 0;
                this.activeFilters.forEach(function(f) {
                    console.log(f);
                    for(var key in f) {
                        if(key == "name" || key == "label") {
                            indicesToRemove.push(i);
                        }
                    }
                    i += 1;
                });
                indicesToRemove.forEach(function(index) {
                    this.activeFilters.splice(index, 1);
                }.bind(this));
            },
            createJSON() {
                let json = {};
                let fixedLevel = false;
                this.activeFilters.forEach(function(f) {
                    for(var key in f) {
                        if(key == "fixedLevel") {
                            fixedLevel = true;
                        }
                        json[key] = f[key];
                    }
                });
                if((this.activeFilters.length == 2 && !fixedLevel) || this.activeFilters.length > 2) {
                    json["operator"] = this.selectedOperator.toLowerCase();
                }
                return json;
            },
            getQuery() {
                let selectedQuery = "";
                this.queries.forEach(function(query) {
                    if(query.isFixed == this.isFixed && query.selectedIndex == this.selectedIndex) {
                        selectedQuery = query.query;
                    }
                }.bind(this));
                return selectedQuery;
            },
            sendRequest() {
                let parameters;
                this.refreshNameOrLabel();
                if(this.selectedIndex == "categories") {
                    if(this.searchInput != "") {
                        this.activeFilters.push({
                            "name" : this.searchInput
                        });
                    }
                }else {
                    if(this.searchInput != "") {
                        this.activeFilters.push({
                            "label" : this.searchInput
                        });
                    }
                }
                parameters = this.createJSON();
                axios.get(config.url + ":" + config.port + "/" + this.getQuery(),{
                params : parameters
                }).then(response => {
                    this.results.length = 0;
                    this.results = response.data;
                    this.$store.state.results = response.data;
                    this.$store.state.searchInput = this.searchInput;
                    this.$store.state.indices = this.indices;
                    this.$store.state.selectedIndex = this.selectedIndex;
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
            checkFilterNone() {
                if(this.filterName != "None") {
                    return true;
                }else {
                    return false;
                }
            },
            checkNoRepetitionInFilters(value) {
                let noRepetition = this.activeFilters.filter(function(f) {
                    return Object.keys(f)[0] == value;
                }.bind(this));
                if(noRepetition.length == 0) {
                    return true;
                }else {
                    return false;
                }
            },
            removeFilter(index) {
                console.log(this.activeFilters[index]);
                if(Object.keys(this.activeFilters[index])[0] == "fixedLevel") {
                    this.isFixed = false;
                }
                this.activeFilters.splice(index, 1);
                this.sendRequest();
            },
            addFilter() {
                if(this.filterValue != "") {
                    if(this.checkNoRepetitionInFilters(this.filterName)) {
                        let filterName = this.filterName;
                        let obj = {};
                        obj[this.filterName] = this.filterValue;
                        this.activeFilters.push(obj);
                    }
                }
                if(this.filterName != "fixedLevel") {
                    this.sendRequest();
                }else {
                    let hasNameFilter = false;
                    this.activeFilters.forEach(function(a) {
                        if(Object.keys(a)[0] == "name" || Object.keys(a)[0] == "label") {
                            hasNameFilter = true;
                        }
                    });
                    this.isFixed = true;
                    if(hasNameFilter) {
                        this.sendRequest();
                    }
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
                    if(this.checkNoRepetitionInFilters(this.filterName)) {
                        this.addFilter();
                    }
				}else {
                    let typeFilter = "";
                    if(this.selectedIndex == "categories") {
                        typeFilter = this.categoriesFilters.filter(function(f) {
                            return f.value == this.filterName;
                        }.bind(this));
                    }else {
                        typeFilter = this.psychographicsFilters.filter(function(f) {
                            return f.value == this.filterName;
                        }.bind(this));
                    }
                    if(typeFilter[0].type == "int") {
                        if ((charCode > 31 && (charCode < 48 || (charCode > 57 && charCode != 189))) && charCode !== 46) {
                            event.preventDefault();
                        } else {
                            if(charCode == 189 && this.filterValue.indexOf("-") > -1) {
                                event.preventDefault();
                            }else {
                                return true;
                            }
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
        margin-left: 44px;
    }

    .activeFilter i {
        cursor: pointer;
        margin-left: 6px;
    }

    .resultsAndFilter {
        margin-top: 50px;
    }
</style>


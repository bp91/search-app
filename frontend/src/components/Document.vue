<template>
    <div class="documentContainer">
        <div class="row"></div>
        <div class="row rowDocument" v-for="document in documents" :key="document.name">
            <div class="col-xs-6">
                <div class="rowDocumentContainer">
                    <div class="row">
                        <div class="col-xs-12 labelTitle">
                            <label>
                                Document
                            </label>
                        </div>
                    </div>
                    <div class="row" v-for="key in documentKeys(document)" :key="key">
                        <div class="col-xs-6 docKey">
                            <label>
                                {{key}} :
                            </label>
                        </div>
                        <div v-if="isChildProperty(key)" class="col-xs-6 docValue">
                            <div v-if="!showChild" class="row">
                                <div class="col-xs-1">
                                    <i class="fa fa-arrow-down" @click="showChild = !showChild"></i>
                                </div>
                                <div class="col-xs-11">
                                </div>
                            </div>
                            <div v-if="showChild">
                                <div class="row">
                                    <div class="col-xs-1">
                                        <i class="fa fa-arrow-up" style="margin-left: -166px;" @click="showChild = !showChild"></i>
                                    </div>
                                    <div class="col-xs-11">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <document :documentType="documentType" :documents="getDocumentChild(document)"></document>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="col-xs-6 docValue">
                            <label>
                                {{getDocumentValue(document, key)}}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-6">
            </div>
        </div>
    </div>
</template>
<script>
import Document from'@/components/Document.vue';

export default {
    name : "document",
    props : ["documentType", "documents"],
    data() {
        return {
            showChild : false
        }
    },
    components : {
        Document
    },
    methods: {
        documentKeys(document) {
            return Object.keys(document);
        },
        getDocumentValue(document, key) {
            return document[key];
        },
        isChildProperty(key) {
            if(this.documentType == "categories") {
                if(key == "children") {
                    return true;
                }else {
                    return false;
                }
            }else {
                if(key == "values") {
                    return true;
                }else {
                    return false;
                }
            }
        },
        getDocumentChild(document) {
            if(this.documentType == "categories") {
                return document.children;
            }else {
                return document.values;
            }
        }
    }
}
</script>
<style>
    .documentContainer {
        margin-left: 30px;
    }
    .rowDocumentContainer {
        border-bottom: 1px solid white;
    }
    .labelTitle label {
        float: left;
    }
    .docValue label {
        float: left;
    }
</style>


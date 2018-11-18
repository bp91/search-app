<template>
    <div class="documentContainer">
        <div class="row"></div>
        <div class="row rowDocument" v-for="document in documents" :key="document.name">
            <div class="col-xs-6">
                <div class="row element" v-if="checkChild(document)">
                    <document-category></document-category>
                </div>
                <div v-else class="rowDocumentContainer">
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
                                {{key}}
                            </label>
                        </div>
                        <div class="col-xs-6 docValue">
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
import DocumentCategory from'@/components/DocumentCategory.vue';
export default {
    data() {
        return {
            documents : []
        }
    },
    components : {
        DocumentCategory
    },
    mounted() {
        this.documents = this.$store.state.results != undefined? this.$store.state.results : [];
    },
    methods: {
        documentKeys(document) {
            return Object.keys(document);
        },
        getDocumentValue(document, key) {
            return document[key];
        },
        checkChild(document) {
            let hasChild = false;
            for(var key in document) {
                if(key == "children") {
                    hasChild = true;
                    break;
                }
            }
            return hasChild;
        }
    }
}
</script>
<style>
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


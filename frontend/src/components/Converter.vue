<template>
    <div class="converterContainer">
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
            <div class="col-xs-4">
            </div>
            <div class="col-xs-4 boxContainer">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <span>
                                    Amount
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                            </div>
                            <div class="col-xs-4">
                                <input type="text" placeholder="Amount" v-model="amount"/>
                            </div>
                            <div class="col-xs-4">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-form">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <span>
                                    Source Currency
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                            </div>
                            <div class="col-xs-4">
                                <select v-model="src_currency">
                                    <option v-for="currency in currencies" :key="currency.id">{{currency.value}}</option>
                                </select>
                            </div>
                            <div class="col-xs-4">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-form">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <span>
                                    Destination Currency
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                            </div>
                            <div class="col-xs-4">
                                <select v-model="dest_currency">
                                    <option v-for="currency in currencies" :key="currency.id">{{currency.value}}</option>
                                </select>
                            </div>
                            <div class="col-xs-4">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-form">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <span>
                                    Reference Date
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                            </div>
                            <div class="col-xs-4 datePicker">
                                <datepicker v-model="reference_date" name="reference_date" :format="customFormatter"></datepicker>
                            </div>
                            <div class="col-xs-4">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-form">
                    <div class="col-xs-2">
                    </div>
                    <div class="col-xs-8">
                        <button :disabled="disableConvert" :class="{ buttonDisabled : disableConvert }" v-on:click="convert()">Send</button>
                    </div>
                    <div class="col-xs-2">
                    </div>
                </div>
            </div>
            <div class="col-xs-4">
            </div>
        </div>
        <result :amount="amountResult" :currency="currencyResult" v-if="showResult"/>
    </div>
</template>
<script>
    import Datepicker from 'vuejs-datepicker';
    import Result from'@/components/Result.vue'
    import axios from 'axios';
    import moment from 'moment';

    // Remember to setup calendar (passing in defaults if needed)
   
    const env = process.env.NODE_ENV || 'development';

    var config = require("../../config/config.json").server[env];
    export default {
        data() {
			return {
                currencies : [],
                amount : "",
                src_currency : "EUR",
                dest_currency : "EUR",
                reference_date : moment().format("YYYY-MM-DD"),
                disableConvert : true,
                amountResult : "",
                currencyResult : "",
                showResult : false,
                errorMessage : ""
			};
        },
        components : {
            Datepicker,
            Result
        },
        beforeCreate() {
            axios.get(config.url + ":" + config.port + "/currencies").then(response => {
                if(response.hasOwnProperty("data") && response.data.hasOwnProperty("response")) {
                    this.currencies = response.data.response;
                }
            })
            .catch(error => {
                this.errorMessage = error.response.data.message;
            });
        },
        watch : {
            "amount" : function(newValue) {
                if(newValue == "" || isNaN(newValue)) {
                    this.disableConvert = true;
                }else {
                    this.checkParams();
                }
            },
            "reference_date" : function(newValue) {
                if(!moment(moment(newValue).format("YYYY-MM-DD"), "YYYY-MM-DD", true).isValid()) {
                    this.disableConvert = true;
                }else {
                    this.checkParams();
                }
            }
        },
        methods : {
            convert() {
                this.errorMessage = "";
                axios.get(config.url + ":" + config.port + "/convert", {
                    params : {
                        amount : this.amount,
                        src_currency : this.src_currency,
                        dest_currency : this.dest_currency,
                        reference_date : moment(this.reference_date).format("YYYY-MM-DD")
                    }
                }).then(response => {
					if(response.hasOwnProperty("data")) {
                        if(response.data.hasOwnProperty("amount") && response.data.hasOwnProperty("currency")) {
                            this.amountResult = response.data.amount;
                            this.currencyResult = response.data.currency;
                            this.showResult = true;
                        }else {
                            this.showResult = false;
                        }
                    }else {
                        this.showResult = false;
                    }
				})
				.catch(error => {
                    this.errorMessage = error.response.data.message;
				});
            },
            customFormatter(date) {
                return moment(date).format('YYYY-MM-DD');
            },
            checkParams() {
                if(this.amount == "" || isNaN(this.amount)) {
                    this.disableConvert = true;
                }
                if(this.src_currency == "") {
                    this.disableConvert = true;
                }
                if(this.dest_currency == "") {
                    this.disableConvert = true;
                }
                if(this.reference_date == "" || !moment(moment(this.reference_date).format("YYYY-MM-DD"), "YYYY-MM-DD", true).isValid()) {
                    this.disableConvert = true;
                }
                this.disableConvert = false;
            }
        }
    }
</script>
<style>
    .boxContainer {
        border-radius: 3px;
        border: 1px solid #bfbfbf;
        background-color: #f2f2f2;
    }

    .row-form {
        margin-top: 5px;
    }

    input[type=text], select {
        width: 100%;
        padding: 7px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    span {
        font-size: 16px;
        font-family: Verdana,sans-serif;
    }

    button {
        width: 100%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }

    .buttonDisabled {
        background-color: #88e88c;
    }
</style>


<template>
    <div class="resultContainer">
        <div class="row">
            <div class="col-xs-1">
            </div>
            <div class="col-xs-10">
                <div class="row">
                    <div class="col-xs-12">
                        <span>
                            <h3>Result</h3>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <span><b>Amount:</b> {{amount}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <span><b>Currency:</b> {{currency}}</span>
                    </div>
                </div>
            </div>
            <div class="col-xs-1">
            </div>
        </div>
    </div>
</template>
<<script>
    export default {
        props : ['amount', 'currency']
    }
</script>
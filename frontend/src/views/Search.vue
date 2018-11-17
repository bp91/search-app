<template>
  <div class="search">
    <Header/>
    <Result/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Result from "@/components/Result.vue";

export default {
  name: "home",
  components: {
    Header,
    Result
  }
};
</script>

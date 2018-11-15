<template>
  <div class="home">
    <Header/>
    <Converter/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Converter from "@/components/Converter.vue";

export default {
  name: "home",
  components: {
    Header,
    Converter
  }
};
</script>

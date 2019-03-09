<template>
  <div class="root">
    <Navbar/>
    <div class="container mx-auto">
      <div class="row">
        <InputForm @formSubmit="formSubmit"/>
        <p class="text-center text-danger">
          <em>For Generating PDF you need to visit makautexam.net</em>
        </p>
        <hr>
      </div>
    </div>
    <rotate-loader class="text-center" :loading="loading" size="15px"></rotate-loader>

    <div class="img-fluid" v-show="result">
      <div class="card-body" v-html="result"></div>
    </div>
    <Footer :class="{'fixed-bottom' : !result }"/>
  </div>
</template>


<script>
import Navbar from "./components/Navbar.vue";
import InputForm from "./components/InputForm.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";
import rotateLoader from "vue-spinner/src/RotateLoader";

export default {
  name: "App",
  data() {
    return {
      result: "",
      loading: false
    };
  },
  components: {
    Navbar,
    InputForm,
    Footer,
    rotateLoader
  },
  methods: {
    formSubmit(data) {
      this.loading = true;
      axios
        .post("/result", {
          roll: data.roll,
          sem: data.sem
        })
        .then(res => {
          this.loading = false;
          this.result = res.data;
        });
    }
  }
};
</script>


<style scoped>
.root {
  height: 100vh;
}

v-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>

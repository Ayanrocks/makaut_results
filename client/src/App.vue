<template>
<div>
    <Navbar /> 
    <div class="container">
        <div class="row">
          <InputForm @formSubmit="formSubmit"/>
          <div class="card mr-2" v-show="result">
            <div class="card-body" v-html="result"></div>
          </div>
        </div>
    </div>    

</div>
</template>


<script>
import Navbar from "./components/Navbar.vue";
import InputForm from "./components/InputForm.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      result: ""
    };
  },
  components: {
    Navbar,
    InputForm
  },
  methods: {
    formSubmit(data) {
      axios
        .post("/result", {
          roll: data.roll,
          sem: data.sem
        })
        .then(res => {
          var body = JSON.parse(res.data.body);
          this.result = body.html;
        });
    }
  }
};
</script>


<style scoped>
</style>

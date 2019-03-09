<template>
    <div>
        <form class="my-4 px-4 py-2">
            <div class="form-group text-center">
                <label for="roll">Roll No.</label>
                <input v-model="roll" type="number" class="form-control" id="roll"  placeholder="Enter Roll No.">

            </div>
            <div class="form-group text-center">
                <label for="sem">Select semester</label>
                <select v-model="sem" class="form-control" id="sem">
                <option value="SM01" selected >Semester 1</option>
                <option value="SM02">Semester 2</option>
                <option value="SM03">Semester 3</option>
                <option value="SM04">Semester 4</option>
                <option value="SM05">Semester 5</option>
                <option value="SM06">Semester 6</option>
                <option value="SM07">Semester 7</option>
                <option value="SM08">Semester 8</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary submit" @click.prevent="formSubmit">Submit</button>

        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      roll: "",
      sem: ""
    };
  },
  methods: {
    formSubmit(e) {
      const data = {
        roll: this.roll,
        sem: this.sem
      };
      this.$emit("formSubmit", data);
    }
  }
};
</script>

<style scoped>
  div{
    width: 100%;
  }

</style>


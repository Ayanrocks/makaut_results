<template>
    <div>
        <form action="" >
            <div class="form-group">
                <label for="roll">Roll No.</label>
                <input v-model="roll" type="number" class="form-control" id="roll"  placeholder="Enter Roll No.">

            </div>
            <div class="form-group">
                <label for="sem">Select semester</label>
                <select v-model="sem" class="form-control" id="sem">
                <option value="SM01">Semester 1</option>
                <option value="SM02">Semester 2</option>
                <option value="SM03">Semester 3</option>
                <option value="SM04" selected>Semester 4</option>
                <option value="SM05">Semester 5</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="formSubmit">Submit</button>

        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      roll: "34600116055",
      sem: "SM04"
    };
  },
  methods: {
    formSubmit(e) {
      const data = {
        roll: this.roll,
        sem: this.sem
      };
      console.log(this.roll + " " + this.sem + " from form");
      this.$emit("formSubmit", data);
    }
  }
};
</script>


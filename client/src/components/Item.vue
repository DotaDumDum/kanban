<template>
  <div class="row mr-3">
    <div
      class="mb-auto"
      :style="
        `background-color: ${color}; border-radius: 5px; width: 25px; height: 25px; margin-right: 1em;  margin-left: 10px; align-self: center`
      "
    />
    <h4 style="color: black; margin: 0; align-self: center; max-width: 100px">
      {{ item }}
    </h4>
    <h1 class="ml-auto">
      <b-icon icon="trash" @click="deleteItem(item)" style="color: red;" />
    </h1>
  </div>
</template>

<script>
import db from "@/config/firestore";
import Swal from "sweetalert2";

export default {
  name: "Item",
  props: {
    item: String,
    collection: String,
    data: Array,
    color: String
  },
  methods: {
    deleteItem(title) {
      let index = this.data.indexOf(title);
      this.data.splice(index, 1);
      Swal.fire("Congratulations!", "Task Deleted!", "success");
      db.collection("tasks")
        .doc(this.collection)
        .set({ tasks: this.data });
    }
  }
};
</script>

<style></style>

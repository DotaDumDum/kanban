<template>
  <div class="container">
    <b-card-group deck>
      <b-card
        style="background-color: #39e; color: white; border: 1px #000 solid; padding: 10px; box-shadow: 5px 10px #000;"
      >
        <b-card-text style="margin-left: 10px;">
          <h5 class="row" style="font-weight: 900">Planning</h5>
          <h6 class="row">{{ planning.length }} Tasks</h6>
          <draggable
            class="list-group"
            :list="planning"
            group="people"
            @change="updatePlanning"
          >
            <div
              class="list-group-item"
              v-for="(element, index) in planning"
              :key="index"
              id="cover"
              style="border: 1px #000 solid"
            >
              <Item
                :item="element"
                :data="planning"
                collection="planning"
                color="#39e"
              />
            </div>
          </draggable>
        </b-card-text>
      </b-card>
      <b-card
        style="background-color: #fc4; color: white; border: 1px #000 solid; padding: 10px; box-shadow: 5px 10px #000"
      >
        <b-card-text style="margin-left: 10px;">
          <h5 class="row" style="font-weight: 900">Pending</h5>
          <h6 class="row">{{ pending.length }} Tasks</h6>
          <draggable
            class="list-group"
            :list="pending"
            group="people"
            @change="updatePending"
          >
            <div
              class="list-group-item"
              v-for="(element, index) in pending"
              :key="index"
              id="cover"
              style="border: 1px #000 solid"
            >
              <Item
                :item="element"
                :data="pending"
                collection="pending"
                color="#fc4"
              />
            </div>
          </draggable>
        </b-card-text>
      </b-card>
      <b-card
        style="background-color: #5c9; color: white; border: 1px #000 solid; padding: 10px; box-shadow: 5px 10px #000"
      >
        <b-card-text style="margin-left: 10px;">
          <h5 class="row" style="font-weight: 900">Completed</h5>
          <h6 class="row">{{ completed.length }} Tasks</h6>
          <draggable
            class="list-group"
            :list="completed"
            group="people"
            @change="updateCompleted"
          >
            <div
              class="list-group-item"
              v-for="(element, index) in completed"
              :key="index"
              id="cover"
              style="border: 1px #000 solid"
            >
              <Item
                :item="element"
                :data="completed"
                collection="completed"
                color="#5c9"
              />
            </div>
          </draggable>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
import db from "@/config/firestore";
import draggable from "vuedraggable";
import Item from "@/components/Item.vue";

export default {
  name: "List",
  components: {
    draggable,
    Item
  },
  data() {
    return {
      planning: [],
      pending: [],
      completed: []
    };
  },
  methods: {
    getTasks() {
      this.planning = [];
      this.pending = [];
      this.completed = [];
      db.collection("tasks").onSnapshot(({ docs }) => {
        docs.forEach(doc => {
          const tasks = doc.data().tasks;
          if (doc.id === "completed") {
            this.completed = tasks;
          } else if (doc.id === "pending") {
            this.pending = tasks;
          } else {
            this.planning = tasks;
          }
        });
      });
    },
    updatePlanning() {
      db.collection("tasks")
        .doc("planning")
        .set({ tasks: this.planning });
    },
    updatePending() {
      db.collection("tasks")
        .doc("pending")
        .set({ tasks: this.pending });
    },
    updateCompleted() {
      db.collection("tasks")
        .doc("completed")
        .set({ tasks: this.completed });
    }
  },
  mounted() {
    this.getTasks();
  }
};
</script>

<style scoped>
.card {
  background-color: #eaeaea;
  height: fit-content;
}
#cover {
  box-shadow: rgba(0, 0, 0, 0.2) 6px 13px 21px -9px;
  background-color: rgb(255, 255, 255);
}
</style>

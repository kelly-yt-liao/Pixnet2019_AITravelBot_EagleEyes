<template>
  <v-stepper :value="stepNow" class="elevation-0">
    <v-stepper-header class="eWhite">
      <template v-for="(item,index) in stepItems">
        <v-stepper-step
          :key="`${index+1}-step`"
          :complete="stepNow > index+1"
          :step="index+1"
          color="eOrange"
        >{{item.title}} {{ index+1 }}</v-stepper-step>
        <v-divider
          v-if="index+1 !== stepItems.length"
          :key="index+1"
          :class="{eRed:stepNow > index+1}"
        ></v-divider>
      </template>
    </v-stepper-header>
  </v-stepper>
</template>
<script>
export default {
  props: {
    stepNow: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      stepItems: [
        { step: 1, title: "選取城市" },
        { step: 2, title: "挑選景點" },
        { step: 3, title: "查看行程" }
      ]
    };
  }
};
</script>



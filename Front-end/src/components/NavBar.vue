<template>
  <nav>
    <v-container class="pb-0">
      <v-layout column align-center class="mb-3">
        <v-flex>
          <h1 class="eBlue--text display-2" @click="getIndex">EagleEyes</h1>
        </v-flex>
        <v-flex class="mt-3">
          <p class="subheading eDark--text text--lighten-4">規劃您理想的旅行路線</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-between>
        <v-flex md2>
          <v-select v-model="area" :items="areas" label="選擇地區" color="eGreen2 darken-2"></v-select>
        </v-flex>
        <v-flex md2>
          <v-menu v-model="menu_S" transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date_S"
                label="開始旅行"
                prepend-icon="date_range"
                readonly
                v-on="on"
                color="eGreen2 darken-2"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date_S" @input="menu_S = false" color="eGreen2 darken-2"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md2>
          <v-menu v-model="menu_E" transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date_E"
                label="滿載而歸"
                prepend-icon="date_range"
                readonly
                v-on="on"
                color="eGreen2 darken-2"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date_E" @input="menu_E = false" color="eGreen2 darken-2"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md2>
          <v-select v-model="target" :items="targets" label="選擇目的" color="eGreen2 darken-2"></v-select>
        </v-flex>
        <v-flex md2>
          <v-btn
            class="eWhite--text font-weight-regular"
            color="eGreen2 darken-2"
            @click="getCityPage"
          >
            Search
            <v-icon right>search</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row v-if="stepNum!=0">
        <v-flex md6 offset-md3>
          <StepBar :stepNow="stepNum" />
        </v-flex>
      </v-layout>
      <v-divider v-if="stepNum!=0" class="mb-3"></v-divider>
    </v-container>
  </nav>
</template>

<script>
import StepBar from "./StepBar";
import { getInitDate } from "../js/dateFuns";

export default {
  data() {
    return {
      area: "北部",
      target: "團體旅遊",
      areas: ["北部", "中部", "南部", "東部"],
      targets: ["團體旅遊", "自由行", "蜜月旅行"],
      menu_S: false,
      menu_E: false,
      date_S: getInitDate(0),
      date_E: getInitDate(5),
      stepNum: 0
    };
  },
  components: {
    StepBar
  },
  methods: {
    getCityPage() {
      this.stepNum = 1;
      this.$router.push({
        name: "city",
        params: {
          area: this.area,
          target: this.target,
          date_S: this.date_S,
          date_E: this.date_E
        }
      });
    },
    getIndex() {
      this.$bus.$emit("changeStep", { stepNum: 0 });
      this.$router.push({
        name: "index"
      });
    }
  },
  created() {
    this.$bus.$on("changeStep", event => {
      this.stepNum = event.stepNum;
    });
  },
  beforeDestroy() {
    this.$bus.$off("changeStep");
  }
};
</script>

<style lang="scss" scoped>
.flex > h1:hover {
  cursor: pointer;
}
</style>


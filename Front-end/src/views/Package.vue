<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-img :src="require('@/assets/googleMap.jpg') " height="250" class="grey darken-4"></v-img>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-4">
      <v-flex md12>
        <v-tabs v-model="active" grow>
          <v-tab
            v-for="tabName in tabNames"
            :key="tabName.zh"
            ripple
            dark
            class="eWhite"
          >{{ tabName.zh }}</v-tab>

          <v-tab-item v-for="tabName in tabNames" :key="tabName.zh" class="mt-4">
            <v-layout row wrap>
              <!-- 讀條
                <v-flex md12 v-show="foodLoading">
                <v-progress-linear color="eGreen2" indeterminate rounded height="6"></v-progress-linear>
              </v-flex>-->
              <v-flex md3 class="pa-2" v-for="(item,index) in getTabData(tabName.en)" :key="index">
                <v-card>
                  <v-img class="white--text" height="200px" :src="item.image">
                    <v-card-title class="align-end fill-height">{{ item.title}}</v-card-title>
                  </v-img>
                  <v-card-text class="one-line">{{ item.title}}</v-card-text>
                  <v-card-actions>
                    <v-btn flat fab color="eRed" @click="addFavorite(item)">
                      <v-icon>favorite</v-icon>
                    </v-btn>

                    <v-btn flat fab color="eRed" @click="addStroke(item)">
                      <v-icon large>add</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>

    <!-- 規劃行程 -->
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="eBlue"
          id="stroke"
          v-on="on"
          @click="openDrawer()"
        >
          <v-icon>storage</v-icon>
        </v-btn>
      </template>
      <span>規劃行程</span>
    </v-tooltip>

    <v-navigation-drawer v-model="drawerStroke" app temporary class="eGreen1 lighten-2">
      <v-layout column>
        <v-flex md12 class="pa-2">
          <v-card class="pb-2" v-for="(travel,i) in selectTravel" :key="travel.title">
            <v-img class="white--text" height="200px" :src="travel.image">
              <v-card-title class="align-end fill-height">{{ travel.title}}</v-card-title>
            </v-img>
            <v-card-text>
              {{ travel.title}}
              <v-btn flat fab color="eRed" @click="deleteStroke(i)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md12 class="text-md-center">
          <v-btn color="eGreen2 eDark--text" @click="getStrokPage">
            Get 行程
            <v-icon right>send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <!-- 我的最愛 -->
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="eBlue"
          id="star"
          v-on="on"
          @click="drawerFavortie=!drawerFavortie"
        >
          <v-icon>star</v-icon>
        </v-btn>
      </template>
      <span>我的最愛</span>
    </v-tooltip>

    <v-navigation-drawer v-model="drawerFavortie" app temporary class="eRed lighten-3">
      <v-layout column>
        <v-flex md3 class="pa-2" v-for="(travel,Index) in favoriteList" :key="travel.title">
          <v-card>
            <v-img class="white--text" height="200px" :src="travel.image">
              <v-card-title class="align-end fill-height">{{ travel.title}}</v-card-title>
            </v-img>
            <v-card-text>{{ travel.title}}</v-card-text>
            <v-card-actions>
              <v-btn flat fab color="eRed" @click="addStroke(travel,index)">
                <v-icon large>add</v-icon>
              </v-btn>

              <v-btn flat fab color="eRed" @click="deleteFavorite(Index)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import axios from "axios";
const API_BASIC = "https://www.bruce0815.xyz";
export default {
  name: "Package",
  props: ["city", "target", "date_S", "date_E"],
  data() {
    return {
      active: -1,
      drawerStroke: false,
      drawerFavortie: false,
      foodLoading: true,
      tabNames: [
        { en: "foods", zh: "美食" },
        { en: "activties", zh: "活動" },
        { en: "scapes", zh: "風景" },
        { en: "shoppings", zh: "購物" },
        { en: "hotels", zh: "Hotelscombined訂房推薦" }
      ],
      selectTravel: [],
      index: 0,
      favoriteList: [],
      foods: [],
      activties: [],
      scapes: [],
      shoppings: [],
      hotels: []
    };
  },
  computed: {
    total() {
      return this.strokeDate.length;
    },
    currentDate() {
      return this.strokeDate[this.index];
    }
  },
  methods: {
    addStroke(travel, index) {
      this.selectTravel.push(travel);

      if (this.drawerFavortie) {
        this.deleteFavorite(index);
      }
    },
    openDrawer() {
      this.drawerStroke = !this.drawerStroke;
      this.index = 0;
    },
    deleteStroke(Index) {
      this.$delete(this.selectTravel, Index);
    },
    addFavorite(travel) {
      this.favoriteList.push(travel);
    },
    deleteFavorite(Index) {
      this.$delete(this.favoriteList, Index);
    },
    getStrokPage() {
      this.$router.push({
        name: "stroke",
        params: {
          selectTravel: JSON.stringify(this.selectTravel),
          date_S: this.date_S,
          date_E: this.date_E
        }
      });
      this.$bus.$emit("changeStep", { stepNum: 3 });
    },
    setTabDatas() {
      for (const tabName of this.tabNames) {
        axios
          .get(
            API_BASIC +
              "/api/v1/querys/search?keyword=" +
              this.city +
              tabName.zh
          )
          .then(res => {
            this.setData(tabName.en, res.data);
          })
          .catch(e => {
            console.error(e);
          });
      }
    },
    setData(en, data) {
      switch (en) {
        case "foods":
          this.active = 0;
          this.foods = data;
          this.foodLoading = false;
          break;
        case "activties":
          this.activties = data;
          break;
        case "scapes":
          this.scapes = data;
          break;
        case "shoppings":
          this.shoppings = data;
          break;
      }
    },
    getTabData(en) {
      switch (en) {
        case "foods":
          return this.foods;
        case "activties":
          return this.activties;
        case "scapes":
          return this.scapes;
        case "shoppings":
          return this.shoppings;
      }
    }
  },
  watch: {
    // call again the method if the route changes
    $route: "setTabDatas"
  },
  created() {
    this.setTabDatas();
  }
};
</script>
<style lang="scss" scoped>
.v-btn--bottom:not(.v-btn--absolute) {
  &#stroke {
    bottom: 50vh;
  }
  &#star {
    bottom: 40vh;
  }
}

.v-carousel {
  text-align: center;
}

.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

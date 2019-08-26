<template>
  <v-container class="pt-0">
    <v-layout row>
      <v-flex>
        <v-breadcrumbs :items="items" divider=">" large class="eBlue darken-1 elevation-1"></v-breadcrumbs>
      </v-flex>
    </v-layout>
    <v-item-group>
      <v-container grid-list-xl>
        <v-layout row wrap>
          <v-flex v-for="city in areaCity" :key="city.name" md4>
            <v-item>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="d-flex align-center"
                  dark
                  height="200"
                  @click="getPackagePage(city.name)"
                >
                  <v-img class="white--text" height="200px" :src="city.imgSrc">
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline">{{ city.name }}</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                </v-card>
              </v-hover>
            </v-item>
          </v-flex>
        </v-layout>
      </v-container>
    </v-item-group>
  </v-container>
</template>

<script>
export default {
  name: "City",
  props: ["area", "target", "date_S", "date_E"],
  data() {
    return {
      citysData: {
        北部: [
          {
            name: "基隆",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "台北",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "新北",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "桃園",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "新竹",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          }
        ],
        中部: [
          {
            name: "苗栗",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "台中",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "彰化",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "南投",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          }
        ],
        南部: [
          {
            name: "嘉義",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "台南",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "高雄",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "屏東",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "雲林",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "澎湖",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          }
        ],
        東部: [
          {
            name: "宜蘭",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "花蓮",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          },
          {
            name: "台東",
            imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          }
        ]
      }
    };
  },
  computed: {
    areaCity() {
      return this.citysData[this.area];
    },
    items() {
      return [
        {
          text: this.area,
          disabled: false,
          href: "#"
        },
        {
          text: this.target,
          disabled: false,
          href: "#"
        }
      ];
    }
  },
  methods: {
    getPackagePage(city) {
      this.$router.push({
        name: "package",
        params: {
          city: city,
          target: this.target,
          date_S: this.date_S,
          date_E: this.date_E
        }
      });
      this.$bus.$emit("changeStep", { stepNum: 2 });
    }
  }
};
</script>

<style lang="scss">
a.v-breadcrumbs__item {
  color: hsl(180, 14%, 95%);
}
</style>
